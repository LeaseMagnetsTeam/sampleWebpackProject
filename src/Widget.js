import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Cookies from 'universal-cookie';
import {
  analyticsMetadata,
  buttonClick,
  closeTour,
  startTour as startTourAnalytics,
  startVisit,
  trackExternal,
} from './api';
import Button from './Button';
// import MagnetContext from './MagnetContext';
import { addScreenLocally, setMagnetId } from './util';
// import VideoMagnet from './VideoMagnet';
import './Widget.css';
const cookies = new Cookies();



// In the real world, screen sizes don't just change, so this is only evaluated
// once. For testing, resize the window and reload the page.
const IS_DESKTOP = !window.matchMedia('only screen and (max-width: 600px)')
  .matches;

const bottomButtonTemplate = [];

const Widget = ({
  uuid,
  startScreen: startRouteOverride,
  inline = false,
  inlineCTA,
  showLinksInline = false,
  layout,
  chatbot,
  startOpen = false,
  primaryColor,
  buttonLabel = 'Take a virtual tour',
  showButton = true,
  hideNavigationButtons = false,
  desktopWidth: _desktopWidth,
  desktopHeight: _desktopHeight,
  backgroundOpacity: _backgroundOpacity = 0,
  onClose,
  widgetType,
  magnetTemplate,
  integrationDetails,
  customIntroMessage,
  bottomBarButtons: bottomBarButtons = [],
  showCloseButton = false,
  closeButtonColor,
}) => {
  const desktopWidth = _desktopWidth ? `${_desktopWidth}%` : undefined;
  const desktopHeight = _desktopHeight ? `${_desktopHeight}%` : undefined;
  const backgroundOpacity = `0.${Number(_backgroundOpacity) > 99 ? 99 : _backgroundOpacity
    }`;
  console.log('primaryColor', primaryColor);
  //Math.max(0, Math.min(Number(_backgroundOpacity), 1)) || 0;
  //console.log('backgroung',backgroundOpacity)

  let utmQuery = decodeURIComponent(window.location.search.substring(1)),
    utmVariables = utmQuery.split('&'),
    ParameterName,
    i;

  const getUTMValue = (inputParameter) => {
    for (i = 0; i < utmVariables.length; i++) {
      ParameterName = utmVariables[i].split('=');
      if (ParameterName[0] === inputParameter) {
        return ParameterName[1] === null ? null : ParameterName[1];
      }
    }
  };

  const valueExists = (value) => {
    return value != null && value != '' && value != undefined;
  };

  const utmAndSourceParams = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'fbclid',
    'gclid',
  ];

  useEffect(() => {
    let tourUtmAndSourceParams = {};
    console.log(
      'tourUtmAndSourceParams original state: ',
      localStorage.getItem('tourUtmAndSourceParams')
    );

    utmAndSourceParams.forEach((param) => {
      var pValue = getUTMValue(param);
      if (valueExists(pValue)) {
        console.log('(tourUtmAndSourceParams) replacing : ', param, pValue);
        tourUtmAndSourceParams[param] = pValue;
      }
    });

    if (
      valueExists(window?.document?.referrer) &&
      !window.document.referrer.includes(window.location.hostname)
    ) {
      tourUtmAndSourceParams['referrer'] = window?.document?.referrer;
    }

    console.log('tourUtmAndSourceParams final state: ', tourUtmAndSourceParams);
    localStorage.setItem(
      'tourUtmAndSourceParams',
      JSON.stringify({
        ...JSON.parse(localStorage.getItem('tourUtmAndSourceParams')),
        ...tourUtmAndSourceParams,
      })
    );
  }, []);

  const [showVideo, setShowVideo] = useState(inline || startOpen);
  const [openTourState, setOpenTourState] = useState({});

  useEffect(() => {
    // Handle reconfiguration
    if (inline || startOpen) setShowVideo(true);
  }, [inline, startOpen]);
  const [template, setTemplate] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [tourStarted, setTourStarted] = useState(false);

  const [[startCategory, startScreen], setStartRoute] = useState([
    'intro',
    'main',
  ]);
  const [[categoryKey, screenKey], setRoute] = useState([
    startCategory,
    startScreen,
  ]);

  // const [dynamicvariable, setdynamicvariable] = useState({});
  const [dynamicButtonLabel, setDynamicButtonLabel] = useState(buttonLabel);
  const [metaOg, setMetaOg] = useState({
    title: '',
    description: '',
    image: '',
  });

  const getScreenByRoute = (category, screen, specificTemplate = {}) => {
    var latestSpecial =
      template?.default_config?.specialOffer || 'Latest special Offer';
    if (category === '_promotions_' && screen === 'latest') {
      return {
        title: latestSpecial
          ? `Redeem your special offer: ` + latestSpecial
          : 'Register to qualify for our latest specials',
        form: {
          contact: {
            enabled: false,
          },
          actions: {
            specialOfferEmailMessage:
              "\nLEASEMAGNETS. to Redeem '" +
              latestSpecial +
              `' FROM VIRTUAL TOUR. PLEASE SHOW EMAIL FOR REDEMPTION! \n\nContact the office to claim your exclusive special or email our staff if you have any questions ` +
              (integrationDetails?.['email-lead-promo']?.cmpEmail
                ? `(${integrationDetails?.['email-lead-promo']?.cmpEmail})`
                : '') +
              (integrationDetails?.['email-lead-promo']?.cmpName
                ? `.\n\nSee you soon from the ${integrationDetails['email-lead-promo'].cmpName} team`
                : ''),
            specialOfferEmailTitle: latestSpecial,
          },
          enabled: true,
          inputs: [
            {
              id: 'lead_name',
              label: 'Name',
              required: true,
              type: 'lead_name',
            },
            {
              id: 'lead_phone',
              label: 'Phone Number',
              required: true,
              type: 'lead_phone',
            },
            {
              id: 'lead_email',
              label: 'Email',
              required: true,
              type: 'lead_email',
            },
          ],
          opacity: 1,
          text_color: 'black',
          text_data: {
            title: latestSpecial
              ? `Redeem your special offer: ` + latestSpecial
              : 'Register to qualify for our latest specials',
            body_text:
              'Fill out your Details Below to claim the special and become eligible for other specials at this time',
            submit_body:
              'You can share this tour with a friend using the buttons below.',
            submit_fail:
              'Oops! Something went wrong while submitting the form. Please try again in a moment.',
            submit_success: 'Your submission has been received!',
          },
        },
        links: [],
      };
    }

    return template?.categories?.[category]?.screens?.[screen];
  };

  console.log('layout: ', layout);

  // Callback to get the video source URL for a given screen, so that the VideoMagnet can start loading
  // new videos ASAP. Might be easier to just give the VideoMagnet the entire template though
  const getNextVideo = ([category, screen]) =>
    getScreenByRoute(category, screen)?.video;
  const screen = getScreenByRoute(categoryKey, screenKey);
  const previewVideo =
    screen?.video || getScreenByRoute(startCategory, startScreen)?.video;
  const previewImage =
    screen?.gif ||
    getScreenByRoute(startCategory, startScreen)?.gif ||
    screen?.img ||
    getScreenByRoute(startCategory, startScreen)?.img;
  const screenTitle = screen?.title;
  const screenLinks = screen?.links;

  const getNewPage = (newRoute) => {
    // newRoute is a string array: [category, screen]
    buttonClick([categoryKey, screenKey], newRoute);
    setRoute(newRoute);
    analyticsMetadata.route = newRoute;
  };

  const restartTour = () => getNewPage([startCategory, startScreen]);

  // A "visit" starts only once, on the first button click, but a "tour"
  // starts any time the button is clicked (including if the tour is closed,
  // then reopened)
  const startTour = (additionalTourOpenDetails) =>
    setTourStarted((started) => {
      if (!started) {
        console.log(
          'startTour 3',
          [categoryKey, screenKey],
          additionalTourOpenDetails
        );
        setOpenTourState(additionalTourOpenDetails);
        startTourAnalytics([categoryKey, screenKey], additionalTourOpenDetails);
      }

      return true;
    });

  // Fetch magnet template from backend
  useEffect(() => {
    setMagnetId(uuid);

    if (customIntroMessage?.video_url) {
      // params (template,category_key,screen_key,screen_obj,setasStartScreen)
      const Data = {
        location_card: '',
        caption: '',
        links: [
          {
            name: 'Continue',
            route: startRouteOverride,
          },
        ],
        video:
          customIntroMessage?.video_url ||
          'https://storage.googleapis.com/leasemagnets---dummy-db.appspot.com/community/127/magnet/category/main/INTRO_NEW_mp4.mp4',
      };

      const setStartSreen = '__custom__.__intro__';
      magnetTemplate = addScreenLocally(
        magnetTemplate,
        setStartSreen.split('.')[0],
        setStartSreen.split('.')[1],
        Data,
        setStartSreen
      );
    }

    const newStartRoute =
      // Override start screen from template if passed in config
      magnetTemplate.start_route?.split('.') ||
      startRouteOverride?.split('.') || ['intro', 'main'];

    if (newStartRoute) {
      setStartRoute(newStartRoute);
      setRoute(newStartRoute); // Doesn't fire analytics events
    }

    setTemplate(magnetTemplate);

    // Set Meta OG Properties for the tour
    let startScreenObj =
      magnetTemplate?.categories?.[newStartRoute?.[0]]?.screens?.[
      newStartRoute?.[1]
      ];
    console.log(
      'startScreenObj: ',
      startScreenObj,
      newStartRoute,
      magnetTemplate
    );
    setMetaOg({
      title: startScreenObj?.caption || 'A Tour built for you',
      description: `${startScreenObj?.location_card}. ${startScreenObj?.caption}.`,
      image:
        startScreenObj?.img ||
        'https://res.cloudinary.com/kingdomkid/image/upload/v1653520019/tourvideoTYG-ogimagedefault_yuluam.png',
    });

    startVisit(magnetTemplate);
  }, [uuid, startRouteOverride, magnetTemplate]);

  useEffect(() => {
    if (showVideo) {
    } else {
      closeTour();
      setTourStarted(false);
    }
  }, [showVideo, inline]);

  useEffect(() => {
    console.log('openTourState change: ', openTourState);
  }, [openTourState]);

  // Expose functions for other JS code
  useEffect(() => {
    // TODO: Closing doesn't play the full close animation, need to "debounce"
    // the showVideo change in VideoMagnet to wait for the animation (like we do in Video)
    window.toggleLeaseMagnetsOpen = () => setShowVideo((show) => !show);
    window.setLeaseMagnetsOpen = (openState = true) => setShowVideo(openState);
    window.setLeaseMagnetsScreen = (newRoute) => setRoute(newRoute.split('.'));
    window.setLmButtonLabel = (newButtonLabel = 'Take a Tour') =>
      setDynamicButtonLabel(newButtonLabel);
    window.triggerTourPixel = (obj) => trackExternal(obj);

    // Clean up
    return () => {
      window.toggleLeaseMagnetsOpen = undefined;
      window.setLeaseMagnetsOpen = undefined;
      window.setLeaseMagnetsScreen = undefined;
      window.setLmButtonLabel = undefined;
      window.triggerTourPixel = undefined;
    };
  }, []);

  return template ? (
    <>
      {window.location.href.indexOf('tour.video') != -1 && (
        <Helmet>
          <meta charSet="utf-8" />
          <title>{metaOg?.title} | Tour.video</title>
          <meta property="og:url" content="tour.video" />
          <meta property="og:type" content="website" />

          <meta name="twitter:card" content="summary" />
          <meta property="og:description" content={metaOg?.description} />
          <meta property="og:title" content={metaOg?.title} />
          <meta property="og:image" content={metaOg?.image} />
        </Helmet>
      )}
      {showButton && (
        <Button
          primaryColor={primaryColor}
          IS_DESKTOP={IS_DESKTOP}
          show={!showVideo}
          setShowVideo={setShowVideo}
          label={dynamicButtonLabel}
          previewVideoUrl={previewVideo}
          previewImageUrl={previewImage}
          showCloseButton={showCloseButton}
          closeButtonColor={closeButtonColor}
          startTour={(
            newRoute = [],
            openTourType = 'widget',
            additionalDetails
          ) => {
            console.log('hello')
          }}
          widgetType={widgetType}
          route={[categoryKey, screenKey]}
          chatbot={chatbot}
        />
      )}
    </>
  ) : null;
};

export default Widget;
