import React from 'react';
import ReactDOM from 'react-dom';
// TODO: webpack-import-glob-loader?
import normalizeStyles from '../vendor/normalize.min.css';
import animationsStyles from './animations.css';
import ButtonStyles from './Button.css';
import commonStyles from './common.css';
import EmbedStyles from './Embed.css';
import importStyles from './imports.css';
import InitialLoader from './InitialLoader';
import InitialLoaderStyles from './InitialLoader.css';
import mediaStyles from './media.css';
import _theme from './theme';
import { HOST } from './util';
import VideoMagnetStyles from './VideoMagnet.css';
import VideoMagnetProgressStyles from './VideoMagnetProgress.css';
import Widget from './Widget';
import WidgetStyles from './Widget.css';

// Some styles (e.g. font @import) must be in the page <head>, not the shadow DOM
// We could use style-loader and a nested Webpack rule to insert only these
// styles into the <head>, but insertAdjacentHTML is so much easier :D
const pageHeadStyles = importStyles;

// style-loader's `insert` option would let us specify where to insert the styles,
// but it runs before any of these DOM elements are created, so we would have to
// create those elements then, and also without access to the config
const shadowBodyStyles = [
  normalizeStyles,
  animationsStyles,
  ButtonStyles,
  commonStyles,
  EmbedStyles,
  WidgetStyles,
  mediaStyles,
  VideoMagnetStyles,
  VideoMagnetProgressStyles,
  InitialLoaderStyles,
].join('\n');

// Keys for storing values in `window`
const INTERNAL_CONFIG_KEY = `_lm-internal-config-${Math.random()}`;
const INTERNAL_PARENT_ID = `_lm-internal-container-${Math.random()}`;
// storing config_key globaly
window.INTERNAL_CONFIG_KEY = INTERNAL_CONFIG_KEY;

const OPEN_LEASEMAGNETS_PARAM = 'openLeaseMagnets';

const renderLeaseMagnets = ({
  parentId,
  layout: _layout,
  chatbot,
  blockEvents = 'keydown',
  customTourMessage = '',
  ...config
}) => {
  let layout = `embed-${
    // Default to "left" if not a valid layout
    ['right', 'center', 'center-bottom'].includes(_layout) ? _layout : 'left'
  }`;
  const doRender = () => {
    let el = null;
    let hasParent = true;
    if (parentId) {
      el = document.getElementById(parentId);
    }
    if (!el) {
      // See if we've already created a LeaseMagnets instance that we want to
      // re-render with a new config
      el = document.getElementById(INTERNAL_PARENT_ID);
    }
    if (!el) {
      // No parent ID or invalid parent ID
      hasParent = false;
      el = document.createElement('div');
      el.id = INTERNAL_PARENT_ID;
      document.body.appendChild(el);
    }

    document.head.insertAdjacentHTML(
      'beforeend',
      `<style>${pageHeadStyles}</style>
      <script src="%%SERVER%%/s/lib.js"
      data-key="js.oj1e1srp87oijohgjo9fyr.9b4uph2lmcwy2a9khx9o6o"
      defer></script>
      <script>window.jitsu = window.jitsu || (function(){(window.jitsuQ = window.jitsuQ || []).push(arguments);})</script>
      `
    );

    // Can't replace an existing shadow root, so check if it exists (mostly relevant for re-creating the VideoMagnet)
    const hadExistingShadow = Boolean(el.shadowRoot);
    const shadowRoot = el.shadowRoot || el.attachShadow({ mode: 'open' });

    // Save event listeners in case the list of events changes between calls
    if (hadExistingShadow && shadowRoot.removeAllEventListeners) {
      shadowRoot.removeAllEventListeners();
    }
    const stopPropagationHandler = (e) => e.stopPropagation();
    const events = [].concat(blockEvents);
    events.forEach((eventType) =>
      shadowRoot.addEventListener(eventType, stopPropagationHandler)
    );
    shadowRoot.removeAllEventListeners = () => {
      events.forEach((eventType) =>
        shadowRoot.removeEventListener(eventType, stopPropagationHandler)
      );
      shadowRoot.removeAllEventListeners = undefined;
    };

    const debugLogs = true;
    let magnetTemplate = {};
    const localConfig = Object.fromEntries(
      Object.entries(config).filter(([_, v]) => v != null) // eslint-disable-line
    );
    let magnetConfig = localConfig;
    let customIntroMessage = {};

    if (localConfig?.startOpen) {
      ReactDOM.render(
        <>
          <style>{shadowBodyStyles}</style>
          <InitialLoader />
        </>,

        shadowRoot
      );
    }

    fetch(
      customTourMessage
        ? `https://api.directual.com/good/api/v5/data/message/getAndCreateMessage?appID=f1a3bb81-3aba-43fb-8369-be1c35b3aa83&messageId=${customTourMessage}`
        : 'https://api.leasemagnets.com/empty_custom_intro_message'
    ).then((customMessageApi) => {
      customMessageApi.json().then((introJson) => {
        // console.log('custominto : TYG', introJson);
        if (introJson.payload.length > 0) {
          customIntroMessage = JSON.parse(introJson?.payload[0]?.data);
        }
        let integrationDetails = {};
        fetch(`${HOST}/magnets/template?magnet_uuid=${config.uuid}`)
          .then((response) => {
            response.json().then((final) => {
              magnetTemplate = final?.magnet?.magnet_details?.template;
              integrationDetails = final?.magnet?.integration_details;
              //  Config is overwritten if dynamic default config values are found
              console.log('magnetTemplate', magnetTemplate);
              if (final?.magnet?.magnet_details?.template?.default_config) {
                const dynamicConfig = Object.fromEntries(
                  Object.entries(
                    final?.magnet?.magnet_details?.template?.default_config
                  ).filter(([_, v]) => v != null) // eslint-disable-line
                );

                // let the local config overwrite the dynamic config because the local config has the final say
                magnetConfig = {
                  ...dynamicConfig,
                  ...localConfig,
                };
              }

              console.log('TYG blessed combined config: all ', magnetConfig);

              // adding dynamic variables
              // magnetConfig = updateDynamicVariables(
              //   magnetTemplate,
              //   magnetConfig
              // );

              const theme = magnetConfig.primaryColor
                ? { ..._theme, '--primary-color': magnetConfig.primaryColor }
                : _theme;

              if (!_layout && magnetConfig?.layout) {
                layout = `embed-${
                  // Default to "left" if not a valid layout
                  ['right', 'center', 'center-bottom'].includes(
                    magnetConfig?.layout
                  )
                    ? magnetConfig?.layout
                    : 'left'
                }`;
              }

              window[window.INTERNAL_CONFIG_KEY] = {
                ...magnetConfig,
                ...window[window.INTERNAL_CONFIG_KEY],
              };

              ReactDOM.render(
                // Gotta also add `layout` here so that the main, parent position: fixed element
                // is in the correct spot for aligning right (e.g. for the button)

                <div
                  styleName={`reset-all WidgetStyles.${layout} ${
                    hasParent ? 'has-parent' : ''
                  }`}
                  style={theme}
                >
                  <style>{shadowBodyStyles}</style>
                  <Widget
                    {...magnetConfig}
                    //chatbot={chatbot}
                    layout={layout}
                    magnetTemplate={magnetTemplate}
                    integrationDetails={integrationDetails}
                    customIntroMessage={customIntroMessage}
                  />
                </div>,
                shadowRoot
              );
            });
            // handle the response
          })
          .catch((error) => {
            // handle the error
            ReactDOM.render(
              // Gotta also add `layout` here so that the main, parent position: fixed element
              // is in the correct spot for aligning right (e.g. for the button)
              <div
                styleName={`reset-all WidgetStyles.${layout} ${
                  hasParent ? 'has-parent' : ''
                }`}
                style={theme}
              >
                <style>{shadowBodyStyles}</style>
                <Widget
                  {...config}
                  chatbot={chatbot}
                  layout={layout}
                  magnetTemplate={magnetTemplate}
                  integrationDetails={integrationDetails}
                  customIntroMessage={customIntroMessage}
                />
              </div>,
              shadowRoot
            );
          });
      });
    });

    // This does not need to be called when re-rendering with a new config
    window.destroyLeaseMagnets = () => {
      shadowRoot.removeAllEventListeners();
      ReactDOM.unmountComponentAtNode(shadowRoot);
      // Can't remove a shadow root, so if a parent element is specified
      // by ID, it will have a shadow root left behind
      if (!hasParent) document.body.removeChild(el);
      window.destroyLeaseMagnets = undefined;
    };
  };

  if (document.readyState === 'complete') {
    doRender();
  } else {
    window.addEventListener('load', doRender);
  }
};

// Alternative to LeaseMagnets({ ... })
// Allows creating "temporary" LeaseMagnets instances that override the initial config
// but automatically reset to the initial config when closed.
// Note that we need to store the original config; putting into `window` because we can't use React state
window.tempLeaseMagnets = (_overrides) => {
  // if (!window[INTERNAL_CONFIG_KEY]) window[INTERNAL_CONFIG_KEY] = _overrides;
  let backup_config = window[INTERNAL_CONFIG_KEY];

  const { onClose: _onClose = () => {}, ...overrides } = _overrides;
  // Preserve provided onClose behavior, but also re-render LeaseMagnets

  const onClose = () => {
    console.log('3', window[INTERNAL_CONFIG_KEY], backup_config);
    _onClose();

    window[INTERNAL_CONFIG_KEY] = backup_config;

    renderLeaseMagnets(backup_config);
  };
  const config = { ...window[INTERNAL_CONFIG_KEY], ...overrides, onClose };
  renderLeaseMagnets(config);
  window.setLeaseMagnetsOpen(true);
};

window.rerenderLeaseMagnets = (_overrides) => {
  const config = { ...window[INTERNAL_CONFIG_KEY], ..._overrides };
  renderLeaseMagnets(config);
};

// Note that this can be called multiple times with different configurations
// to re-render the VideoMagnet with the new configuration
const LeaseMagnets = (_config) => {
  _config = Object.fromEntries(
    Object.entries(_config).filter(([_, v]) => v != null)
  );
  window[window.INTERNAL_CONFIG_KEY] = _config;

  // See if the OPEN_LEASEMAGNETS_PARAM URL query param is present in the URL
  // Best practice to check the URL every time this function is called
  const urlParams = new URLSearchParams(window.location.search);
  const forceStartOpen =
    urlParams.get(OPEN_LEASEMAGNETS_PARAM) !== null &&
    urlParams.get(OPEN_LEASEMAGNETS_PARAM) !== 'false';
  const forceStartOpenConfig = forceStartOpen
    ? {
        startOpen: true,
        layout: 'center',
        backgroundOpacity: 80,
        onClose: () => {
          const newParams = new URLSearchParams(window.location.search);
          newParams.delete(OPEN_LEASEMAGNETS_PARAM);
          window.history.replaceState(null, null, `?${newParams.toString()}`);
          LeaseMagnets(_config); // Use original, non-overridden config
        },
      }
    : {};

  if (
    /^([a-z_0-9]+\.[a-z_0-9]+)$/.test(urlParams.get(OPEN_LEASEMAGNETS_PARAM))
  ) {
    // console.log('forcestartopen: openLMparam ');
    window[INTERNAL_CONFIG_KEY].startScreen = urlParams.get(
      OPEN_LEASEMAGNETS_PARAM
    );
    forceStartOpenConfig.startScreen = urlParams.get(OPEN_LEASEMAGNETS_PARAM);
  }

  let config = { ..._config, ...forceStartOpenConfig };
  console.log(
    'forcestartopen: ',
    forceStartOpenConfig,
    urlParams.get(OPEN_LEASEMAGNETS_PARAM),
    config
  );

  const tourMsg = urlParams.get('tourMsg');
  if (urlParams.has('tourMsg')) {
    config = { ...config, customTourMessage: tourMsg };
  }
  renderLeaseMagnets(config);
};
// this Component being called in index.html
export default LeaseMagnets;
