import { jitsuClient } from '@jitsu/sdk-js';
import ReactPixel from 'react-facebook-pixel';
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';
import {
  getMagnetId,
  getUserId,
  getUserInfo,
  getVisitId,
  post,
  setUserId,
  setUserInfo,
  setVisitId,
} from './util';

const storingDataLocalStorage = (clickEvent) => {
  const tempJoin = clickEvent?.join('.');
  if (localStorage.getItem('tourpixel')) {
    const data = JSON.parse(localStorage.getItem('tourpixel'));
    console.log('dataStorage', data);
    if (data[getMagnetId()]) {
      if (data[getMagnetId()][tempJoin]) {
        data[getMagnetId()][tempJoin] = data[getMagnetId()][tempJoin] + 1;
        localStorage.setItem('tourpixel', JSON.stringify(data));
        // data[getMagnetId()][tempJoin] = ++incr
      } else {
        data[getMagnetId()][tempJoin] = 1;
        localStorage.setItem('tourpixel', JSON.stringify(data));
      }
    } else {
      (data[getMagnetId()] = {
        [tempJoin]: 1,
      }),
        localStorage.setItem('tourpixel', JSON.stringify(data));
    }
  } else {
    const data = {
      [getMagnetId()]: {
        [tempJoin]: 1,
      },
    };
    localStorage.setItem('tourpixel', JSON.stringify(data));
  }
};

// Used to keep track of metadata required for Events
// Having this global thing here is pretty bad, but the alternative
// is passing a lot of parameters around just for analytics or a Context
export const analyticsMetadata = {
  route: null,
  videoTime: 0,
};

// This should be kept in sync with EventType in models.py on the backend
const EVENT_TYPE = Object.freeze({
  OPEN_TOUR: 'open_tour',
  BUTTON_CLICK: 'button_click',
  FORM_VIEW: 'form_view',
  IFRAME_VIEW: 'iframe_view',
  FORM_SUBMISSION: 'form_submission',
  CLOSE_TOUR: 'close_tour',
});

// Map EVENT_TYPEs to Google Analytics events
const GA_EVENT = Object.freeze({
  open_tour: 'Open Tour',
  button_click: 'Button Click',
  form_view: 'form_view',
  iframe_view: 'iframe_view',
  form_submission: 'Form Submission',
  close_tour: 'Close Tour',
});

const gaEventLabel = (type, details) => {
  if (type === EVENT_TYPE.BUTTON_CLICK) {
    return details.to;
  }
  if (type === EVENT_TYPE.FORM_SUBMISSION) {
    return details.form_route;
  }
  if (type === EVENT_TYPE.CLOSE_TOUR) {
    return details.last_route;
  }
  return undefined;
};

// Map EVENT_TYPEs to Facebook Pixel events
const PIXEL_EVENT = Object.freeze({
  open_tour: 'OpenTour',
  button_click: 'ButtonClick',
  form_view: 'FormView',
  iframe_view: 'IframeViewt',
  form_submission: 'FormSubmission',
  close_tour: 'CloseTour',
});

export const trackExternal = async (obj) => {
  const { type, intent, details } = obj;
  ReactPixel.trackCustom(intent, details);
};

const track = async (type, details) => {
  console.log('event ', type, track, {
    visit_uuid: await getVisitId(),
    visitor_uuid: await getUserId(),
    magnet_uuid: getMagnetId(),
    event_type: type,
    to: details?.to?.join('.'),
    from: details?.from?.join('.'),
    details,
  });
  // Add current lead UUID to `details`
  const { leadUUID } = getUserInfo();
  // eslint-disable-next-line no-param-reassign
  if (leadUUID) details.lead_uuid = leadUUID;

  // It's OK to fire GA or Pixel events even if it isn't initialized
  ReactGA.event({
    category: 'Tour Event',
    action: GA_EVENT[type],
    label: gaEventLabel(type, details),
    ...('video_time' in details && { value: details.video_time }),
  });
  ReactPixel.trackCustom(PIXEL_EVENT[type], details);

  if (details?.to || details?.from) {
    if (details?.to) {
      ReactPixel.trackCustom(details?.to?.join('.') || '', details);
    } else {
      ReactPixel.trackCustom(details?.from?.join('.') || '', details);
    }
  }

  const jitsu = jitsuClient({
    key: 'js.oj1e1srp87oijohgjo9fyr.9b4uph2lmcwy2a9khx9o6o',
    tracking_host: 'https://t.jitsu.com',
    randomize_url: true,
  });
  // const {track} =  useJitsu()
  jitsu.track(type, {
    visit_uuid: await getVisitId(),
    visitor_uuid: await getUserId(),
    magnet_uuid: getMagnetId(),
    event_type: type,
    to: details?.to?.join('.'),
    from: details?.from?.join('.'),
    details,
  });

  console.log('jitsu client: ');

  if (details?.ignoreEventApi === true) {
    // Sometimes we might want to send events to bigquery without notifying our internal event api.
    // This is why we offer the ability to ignoreEventApi
    return {};
  }
  const res = await post('/event', {
    visit_uuid: await getVisitId(),
    visitor_uuid: await getUserId(),
    magnet_uuid: getMagnetId(),
    url: window.location.href,
    event_type: type,
    details,
  });

  if (res.visit_uuid) {
    setVisitId(res.visit_uuid);
  }

  if (res.visitor_uuid) {
    setUserId(res.visitor_uuid);
  }

  if (type === 'button_click') {
    storingDataLocalStorage(details?.to);
  }

  return res;
};

export const startVisit = async (magnetTemplate) => {
  if (magnetTemplate?.magnetSettings?.tracking?.gaPropertyId) {
    // Note that react-ga only supports "UA-" (Universal Analytics) IDs,
    // not "G-" (Google Analytics 4) IDs. Google Analytics does have an
    // option to create both a UA and a GA4 ID for the same project though
    ReactGA.initialize(magnetTemplate?.magnetSettings?.tracking?.gaPropertyId, {
      gaOptions: {
        siteSpeedSampleRate: 100,
        // userId?
      },
    });
    // We could use custom URLs here to track movement through the screens
    // instead of using ButtonClick events
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  if (magnetTemplate?.magnetSettings?.tracking?.gtmId) {
    TagManager.initialize({
      gtmId: magnetTemplate?.magnetSettings?.tracking?.gtmId, //magnetTemplate?.tracking?.gtmId
      events: {
        sendUserInfo: 'leasemagnetsTourVisit',
      },
    });
  }

  if (magnetTemplate?.magnetSettings?.tracking?.fbPixelId) {
    ReactPixel.init(magnetTemplate?.magnetSettings?.tracking?.fbPixelId, {
      autoConfig: true,
      debug: false,
    });
    ReactPixel.pageView();
  }

  // getVisitId() will fetch a new visit UUID if one isn't found in cookies
  const visitId = await getVisitId();
  // Initialize Jitsu (jitsu)
  const jitsu = jitsuClient({
    key: 'js.oj1e1srp87oijohgjo9fyr.9b4uph2lmcwy2a9khx9o6o',
    tracking_host: 'https://t.jitsu.com',
    randomize_url: true,
  });
  // identify user
  jitsu.id({
    // "email": getEmail(), TODO check if cookies is already found cookies.get("_lm_user_info", "email")
    internal_id: visitId,
  });
};

export const startTour = (to, details = {}) => {
  let tourUtmAndSourceParamsTYG = {};
  if (localStorage.getItem('tourUtmAndSourceParams')) {
    tourUtmAndSourceParamsTYG = JSON.parse(
      localStorage.getItem('tourUtmAndSourceParams')
    );
  }
  track(EVENT_TYPE.OPEN_TOUR, {
    to,
    ...details,
    ...tourUtmAndSourceParamsTYG,
  });
};

export const closeTour = () => {
  track(EVENT_TYPE.CLOSE_TOUR, {
    last_route: analyticsMetadata.route,
    video_time: analyticsMetadata.videoTime,
  });
};
// Send a CLOSE_TOUR event when the page is reloaded or closed
// window.addEventListener('beforeunload', closeTour, false);

export const buttonClick = (from, to) => {
  const res = track(EVENT_TYPE.BUTTON_CLICK, {
    from,
    to,
    video_time: analyticsMetadata.videoTime,
  });

  return res;
};

export const formSubmission = async (formData, additionalDetails = {}) => {
  TagManager.dataLayer({
    // TYG The GTM is initialized above, We can just push events to datalayer
    dataLayer: {
      event: 'leasemagnets_tour_form_submission',
      form_data: formData,
      ...additionalDetails,
    },
  });

  console.log('formSubmission: ', formData, additionalDetails);
  if (
    additionalDetails?.details?.form_data?.lead_email ===
      'amulya@leasemagnets.com' ||
    additionalDetails?.details?.form_data?.lead_email ===
      'parmar.amulya@gmail.com'
  ) {
    console.log('formSubmission, TYG return early');
    return {};
  }

  const res = await track(EVENT_TYPE.FORM_SUBMISSION, {
    form_data: formData, // form_route: "[currentCategory, currentScreen]"
    ...additionalDetails,
  });

  const newLeadUUID = res?.lead_uuid;
  if (newLeadUUID) {
    setUserInfo({
      leadUUID: newLeadUUID,
      // Some of these may be undefined, that's OK
      name: formData.lead_name,
      email: formData.lead_email,
      phone: formData.lead_phone,
    });
  }

  return res;
};

// Iframe is a Form View with an iframe_src attribute
export const formView = async (additionalDetails = {}) => {
  const res = await track(EVENT_TYPE.FORM_VIEW, {
    ...additionalDetails, // form_route: "[currentCategory, currentScreen]"
  });
  return res;
};
