import Cookies from 'universal-cookie';

// const fetch = fetchRetry(originalFetch, {
//   retries: 3,
//   retryDelay: 100,
// });

export const HOST =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_HOST_DEV
    : process.env.REACT_APP_HOST;
export const EMBED_HOST = 'https://embed.tour.video/';

const USER_ID_COOKIE_KEY = '_lm_user_id';
const USER_INFO_COOKIE_KEY = '_lm_user_info';
const VISIT_ID_COOKIE_KEY = '_lm_visit_id';
const VISIT_ID_EXPIRATION_MS = 3600000; // 1 hour = 1 * 60 * 60 * 1000

const cookies = new Cookies();
const metadata = {};

const request = async (route, data, method = 'GET') => {
  const headers = new Headers();
  let json;

  if (method === 'POST') {
    headers.append('Content-Type', 'application/json');
  }

  try {
    let queryString = '';
    if (method === 'GET') {
      // Build query string for GET
      queryString += `?${Object.keys(data)
        .map((key) => `${key}=${data[key]}`)
        .join('&')}`;
    }

    const url = HOST + route + queryString;
    const res = await fetch(url, {
      method,
      headers,
      // Only pass body for POST
      ...(method === 'POST' && { body: JSON.stringify(data) }),
      credentials: 'include',
    });

    try {
      const text = await res.text();
      json = JSON.parse(text);
    } catch (err) {
      json = { status: 'fail', error: `Request returned invalid JSON: ${err}` };
    }
  } catch (err) {
    json = { status: 'fail', error: `Failed to make request: ${err}` };
  }

  if (json.status === 'fail' || json.error) {
    console.error(json.error);
  }
  return json;
};

export const get = request;
export const post = (route, data) => request(route, data, 'POST');

// TODO: This should probably be part of React state
// Maybe make a useAnalytics hook that provides analytics event methods
export const setMagnetId = (magnetId) => {
  metadata.magnetId = magnetId;
  return magnetId;
};

export const getMagnetId = () => metadata.magnetId;

export const setUserId = (userId) => {
  cookies.set(USER_ID_COOKIE_KEY, userId);
};

// Note that this is async and you need to use `await`!
export const getUserId = async () => {
  let userId = cookies.get(USER_ID_COOKIE_KEY);
  if (!userId) {
    // Get new visitor UUID from backend
    const res = await post('/visitor', {});
    if (res.visitor_uuid && !res.error) {
      userId = res.visitor_uuid; // New UUID generated on the backend
      setUserId(userId);
    }
    // Note that we shouldn't reset the visit ID here if we didn't have a visitor ID,
    // since if we have a valid visit ID we can get the visitor ID from that
  }
  return userId;
};

export const replaceUserInfo = (string) => {
  if (!string) return string;
  // Some text elements in template may contain elements to fill with user
  // data, e.g. Welcome{{, {name}|}}! Glad you could join us, {{{name}|friend}}
  // Left side of | is key to use, right is alternative if key isn't available
  // Just allowing one replacement per {{}} block right now
  let startReplacement;
  let str = string;
  // eslint-disable-next-line no-cond-assign
  while ((startReplacement = str.indexOf('{{')) !== -1) {
    const separator = str.indexOf('|', startReplacement + 2);
    const stringWithKey = str.slice(startReplacement + 2, separator);

    const endReplacement = str.indexOf('}}', separator + 1);
    const alternative = str.slice(separator + 1, endReplacement);

    // Find key to replace
    const keyToReplaceStart = str.indexOf('{', startReplacement + 2);
    const keyToReplaceEnd = str.indexOf('}', keyToReplaceStart + 1);
    const keyToReplace = str.slice(keyToReplaceStart + 1, keyToReplaceEnd);

    const replacement =
      metadata?.userInfo[keyToReplace] && keyToReplaceEnd < separator
        ? stringWithKey.replace(
            `{${keyToReplace}}`,
            metadata.userInfo[keyToReplace]
          )
        : alternative;

    str =
      str.slice(0, startReplacement) +
      replacement +
      str.slice(endReplacement + 2);
  }
  return str;
};

export const replaceStringwithdynamicvariable = (string, dynamicvariable) => {
  if (!string) return string;
  // original string Take a tour {{and {special_offer} | }}
  // Converted_String Take a tour and $250 off floor plans
  // Some text elements in template may contain elements to fill with user
  // data, e.g. Welcome{{, {name}|}}! Glad you could join us, {{{name}|friend}}
  // Left side of | is key to use, right is alternative if key isn't available
  // Just allowing one replacement per {{}} block right now
  let startReplacement;
  let str = string;
  // eslint-disable-next-line no-cond-assign
  while ((startReplacement = str.indexOf('{{')) !== -1) {
    const separator = str.indexOf('|', startReplacement + 2);
    const stringWithKey = str.slice(startReplacement + 2, separator);

    const endReplacement = str.indexOf('}}', separator + 1);
    const alternative = str.slice(separator + 1, endReplacement);

    // Find key to replace
    const keyToReplaceStart = str.indexOf('{', startReplacement + 2);
    const keyToReplaceEnd = str.indexOf('}', keyToReplaceStart + 1);
    const keyToReplace = str.slice(keyToReplaceStart + 1, keyToReplaceEnd);

    const replacement =
      dynamicvariable[keyToReplace] && keyToReplaceEnd < separator
        ? stringWithKey.replace(
            `{${keyToReplace}}`,
            dynamicvariable[keyToReplace]
          )
        : alternative;

    str =
      str.slice(0, startReplacement) +
      replacement +
      str.slice(endReplacement + 2);
  }
  return str;
};

export const updateDynamicVariables = (magnetTemplate, magnetConfig) => {
  if (magnetTemplate.dynamic) {
    const buttonLabel = replaceStringwithdynamicvariable(
      magnetConfig?.buttonLabel,
      magnetTemplate?.dynamic
    );

    return {
      ...magnetConfig,
      ...magnetTemplate.dynamic,
      buttonLabel,
    };
  }

  return magnetConfig;
};

export const addScreenLocally = (
  template,
  __custom__,
  __intro__,
  screenobj,
  setAsStartScreen = false
) => {
  const obj = {
    ...template,
    category_keys: [...template.category_keys, __custom__],
    categories: {
      ...template.categories,
      [__custom__]: {
        screens: {
          [__intro__]: screenobj,
        },
        screen_keys: [__intro__],
      },
    },
    start_route: setAsStartScreen,
  };

  return obj;
  // console.log('screeenn',obj)
  // window.startscreenobj = obj
};

// Remove special characters (except -)
const replace = (str) =>
  str?.replace(/[`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi, '');

export const setUserInfo = (userInfo) => {
  metadata.userInfo = {
    ...userInfo,
    name: replace(userInfo.name),
    phone: replace(userInfo.phone),
  };
  if (userInfo.name) {
    [metadata.userInfo.firstName, metadata.userInfo.lastName] =
      metadata.userInfo.name.split(/ (.+)/);
  }
  cookies.set(USER_INFO_COOKIE_KEY, metadata.userInfo);
};

export const getUserInfo = () => metadata.userInfo;

// Initialize metadata.userInfo
const userInfo = cookies.get(USER_INFO_COOKIE_KEY);
setUserInfo(userInfo && userInfo !== 'undefined' ? userInfo : {});

const getVisitIdExpirationDate = () => {
  const expiry = new Date();
  // Add time until expiration (in milliseconds)
  expiry.setTime(expiry.getTime() + VISIT_ID_EXPIRATION_MS);
  return expiry;
};

export const setVisitId = (visitId) => {
  cookies.set(VISIT_ID_COOKIE_KEY, visitId, {
    expires: getVisitIdExpirationDate(),
  });
};

// Note that this is async and you need to use `await`!
export const getVisitId = async () => {
  let visitId = cookies.get(VISIT_ID_COOKIE_KEY);
  if (!visitId) {
    // Send new visit info to backend and receive new visit UUID
    const res = await post('/visit', {
      magnet_uuid: getMagnetId(),
      visitor_uuid: await getUserId(),
    });
    if (res.visit_uuid && !res.error) {
      visitId = res.visit_uuid; // New UUID generated on the backend
    }
  }
  // Only update expiration time if we found UUID in cookies or successfully
  // fetched one from the backend
  if (visitId) {
    setVisitId(visitId); // Update visit ID cookie expiration time
  }
  return visitId;
};

export const formatTimestamp = (time) => {
  // time in seconds => "hours:minutes:seconds"
  // Output like "1:01" or "4:03:59" or "123:03:59"
  const hrs = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const secs = Math.floor(time) % 60;

  let ret = '';
  if (hrs > 0) {
    ret += `${hrs}:${minutes < 10 ? '0' : ''}`;
  }
  ret += `${minutes}:${secs < 10 ? '0' : ''}`;
  ret += `${secs}`;
  return ret;
};
