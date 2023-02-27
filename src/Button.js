/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import './animations.css';
import './Button.css'; // These imports are still required so that our Babel CSS modules plugin can resolve CSS class names
import { ThumbIcon } from './Icons';
import { getMagnetId } from './util';

const EXIT_TIME = 1000 - 50; // Slightly shorter than CSS animation duration to finish transitions just before animation ends

// When `show` changes to true, we begin loading the video by rendering the
// <Transition>, (with the <button> set to display: none) but don't enter the
// Transition to actually display the button until the video can play

// When `show` changes to false, we begin exiting the Transition, but continue
// rendering the <Transition> (with `show || videoLoaded`) until after the exit
// animation is complete and we setVideoLoaded(false) to stop rendering

const Button = ({
  show,
  label,
  previewImageUrl,
  previewVideoUrl,
  startTour,
  widgetType,
  route,
  chatbot,
  IS_DESKTOP,
  primaryColor,
  showCloseButton,
  closeButtonColor,
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [showwidget, setshowwidget] = useState(true);
  const [circleLoading, setCircleLoading] = useState(true);

  const [chatBotState, setChatBot] = useState();

  const [hoverIdx, setHoverIdx] = useState(null);

  const widgetTypeCss = `${
    // Default to "left"
    ['circle', 'vertical'].includes(widgetType) ? widgetType : 'circle'
  }`;
  useEffect(() => {
    if (widgetTypeCss !== 'circle') {
      setCircleLoading(false);
    }
    setTimeout(() => {
      setCircleLoading(false);
    }, 3500);
  }, []);
  const today = new Date().getTime();

  useEffect(() => {
    if (window.CHAT_BUTTON_VARIABLES) {
      const chatbuttons = window.CHAT_BUTTON_VARIABLES;
      console.log(';chatbuttons', chatbuttons);
      setChatBot(chatbuttons);
    }
    // var audio = new Audio(
    //   'https://firebasestorage.googleapis.com/v0/b/videopro-tyg.appspot.com/o/click%20TYG.mp3?alt=media&token=93ca165d-b77b-4ead-a686-6eecee7f269f'
    // );
    // audio.play();
  }, []);
  useEffect(() => setVideoLoaded(false), [previewVideoUrl]);
  useEffect(() => {
    if (!show) setTimeout(() => setVideoLoaded(false), EXIT_TIME + 50);
  }, [show]);

  useEffect(() => {
    setTimeout(() => setShowChatBot(true), 1000);
  }, []);

  // Expose functions for other JS code
  useEffect(() => {
    window.openLmChat = () => setShowChatBot(true);
    window.toggleLmChat = () => setShowChatBot((showChatBots) => !showChatBots);
    window.customLmChat = (chatObj) => {
      setChatBot(chatObj);
      setShowChatBot(true);
    };

    if (chatbot) {
      window.customLmChat(chatbot);
    }

    // Clean up
    return () => {
      window.openLmChat = undefined;
      window.toggleLmChat = undefined;
      window.customLmChat = undefined;
    };
  }, []);

  window.INTERNAL_CONFIG_KEY = INTERNAL_CONFIG_KEY;
  const layoutt = window[INTERNAL_CONFIG_KEY].layout;

  const onClickLink = (link, openTourType = 'button') => {
    console.log('my link', link);
    if (link.js) {
      try {
        eval(link.js);
      } catch (error) {
        console.log('my error', error);
      }
    }
    if (link.route) {
      const newRoute = link.route.split('.');
      startTour(newRoute, openTourType, {
        layout: layoutt,
        button_title: link?.label || '',
        button_subtitle: link?.subTitle || '',
        button_imgs: link?.picArray?.length || 0,
      });
    } else if (link.href) {
      // This creates an inconsistency in the "linked list" of Events, which
      // each have a "to" and a "from" route. We could fire another Event here
      // from `link.href` to `currentRoute`, or when processing Events, use the
      // previous `from` if previous `to` is not equal to current `from`
      startTour(newRoute, 'link-click', {
        layout: layoutt,
        button_title: link?.label || '',
        button_subtitle: link?.subTitle || '',
        button_imgs: link?.picArray?.length || 0,
        link_type: 'new-tab',
      });
      window.open(link.href, '_blank').focus();
    } else if (link.href_direct) {
      // This creates an inconsistency in the "linked list" of Events, which
      // each have a "to" and a "from" route. We could fire another Event here
      // from `link.href` to `currentRoute`, or when processing Events, use the
      // previous `from` if previous `to` is not equal to current `from`
      startTour(newRoute, 'link-click', {
        layout: layoutt,
        button_title: link?.label || '',
        button_subtitle: link?.subTitle || '',
        button_imgs: link?.picArray?.length || 0,
        link_type: 'same-tab',
      });
      window.open(link.href_direct, '_self').focus();
    }

    const audio = new Audio(
      'https://firebasestorage.googleapis.com/v0/b/videopro-tyg.appspot.com/o/click%20TYG.mp3?alt=media&token=93ca165d-b77b-4ead-a686-6eecee7f269f'
    );
    audio.play();
  };

  function loopThroughAllConditions(conditions) {
    return conditions.map((conditionArr, idx) => {
      return conditionArr
        .map((condition, idx) => {
          // console.log('object', condition);
          // console.log('result', checkCondition2(condition));
          return checkCondition2(condition);
        })
        .every((element) => element === true);
    });
  }

  function checkCondition2(condition) {
    if (!condition) {
      return true;
    }

    if (condition.type === 'date') {
      if (condition.operator === '<') {
        return today < new Date(condition.value).getTime();
      }
      if (condition.operator === '>') {
        return today > new Date(condition.value).getTime();
      }
      if (condition.operator === '>=') {
        return today >= new Date(condition.value).getTime();
      }
      if (condition.operator === '<=') {
        return today <= new Date(condition.value).getTime();
      }
    } else if (condition.type === 'url') {
      const currentUrl = window.location.href;
      // console.log('currentUrl', currentUrl);

      if (condition.operator === 'includes') {
        const result = condition.value
          .map((url, idx) => currentUrl.includes(url))
          .some((element) => element === true);
        return result;
      }
      if (condition.operator === 'excludes') {
        const result = condition.value
          .map((url, idx) => !currentUrl.includes(url))
          .some((element) => element === true);
        return result;
      }
    } else if (condition.type === 'layout') {
      if (condition.operator === 'isDesktop') {
        return IS_DESKTOP;
      }
      if (condition.operator === 'isMobile') {
        return !IS_DESKTOP;
      }
    } else if (condition.type === 'tourPixelHistory') {
      const tourpixel = JSON.parse(localStorage.getItem('tourpixel'));
      let relatedPixel = tourpixel?.[getMagnetId()]?.[condition.route];
      // console.log('relatedPixel', relatedPixel);
      if (!relatedPixel) {
        relatedPixel = 0;
      }
      if (condition.operator === '<') {
        return relatedPixel < condition.value;
      }
      if (condition.operator === '>') {
        return relatedPixel > condition.value;
      }
      if (condition.operator === '>=') {
        return relatedPixel >= condition.value;
      }
      if (condition.operator === '<=') {
        return relatedPixel <= condition.value;
      }
    }

    return true;
  }

  function checkCondition(condition) {
    let showCondition = true;
    if (condition == undefined) {
      return true;
    }

    if (condition?.pixelHistory) {
      const tourpixel = JSON.parse(localStorage.getItem('tourpixel'));
      const relatedPixel = tourpixel[getMagnetId()];
      condition?.pixelHistory.forEach((pixel) => {
        console.log('pixel');
        if (relatedPixel[pixel?.route] < pixel?.min) {
          if (pixel?.max && relatedPixel[pixel?.route] > pixel?.max) {
            console.log('pixel max and min = false');
            showCondition = false;
          }
          console.log('pixel min =true max =false ');
          showCondition = false;
        }
      });
    }

    if (condition?.urlIncludes) {
      const conditions = condition?.urlIncludes.filter((url, idx) => {
        console.log('url condition: ', url);
        if (!window.location.href.includes(url)) {
          return true;
        }
      });

      console.log('conditions: ', conditions);
      if (conditions && conditions.length > 0) {
        showCondition = false;
      }
    }

    if (!showCondition) {
      return false;
    }

    if (condition?.dateStart === '' && condition?.dateEnd === '') {
      return true;
    }

    if (condition?.dateStart && condition?.dateEnd) {
      if (
        new Date(condition.dateStart).getTime() <
        new Date(condition.dateEnd).getTime()
      ) {
        if (new Date(condition.dateStart).getTime() <= today) {
          if (today <= new Date(condition.dateEnd).getTime()) {
            return true;
          }
          return false;
        }
        return false;
      }
    }

    if (condition?.dateStart) {
      return today >= new Date(condition.dateStart).getTime();
    }
    if (condition?.dateEnd) {
      return today <= new Date(condition.dateEnd).getTime();
    }
    return true;
  }

  // useEffect(() => {
  //   let filteredchatbot  = chatbot.map((item) => {
  //     if(loopThroughAllConditions(item.condition).includes(true)) {
  //       console.log('loopThroughAllConditions(item.condition)',loopThroughAllConditions(item.condition))
  //       return item
  //     }
  //   })
  //   console.log("filteredchatbot",filteredchatbot)
  //   // const res = loopThroughAllConditions(bot[0].condition)
  //   // console.log('ress',res)
  // },[])

  const [cross, setCross] = useState(false);
  const crossbuttonlayout = {};
  if (layoutt == 'left') {
    crossbuttonlayout.left = '8px';
  } else {
    crossbuttonlayout.right = '8px';
  }
  return (
    (show || videoLoaded) &&
    showwidget && (
      <Transition
        in={show && (videoLoaded || previewImageUrl)}
        timeout={{ enter: 600, exit: EXIT_TIME }}
      >
        {(status) => (
          <div styleName={`main-button-block eembed-${layoutt || 'left'}`}>
            {showCloseButton && (
              <button
                onClick={() => {
                  setshowwidget(false);
                }}
                style={{
                  width: 30,
                  height: 30,
                  position: 'absolute',
                  top: '6px',
                  backgroundColor: 'white',
                  zIndex: 1000012312321,
                  borderRadius: '50%',
                  outline: 'none',
                  border: `1px solid ${closeButtonColor || '#F2F2F2'}`,
                  ...crossbuttonlayout,
                }}
                styleName="button_hover"
              >
                <svg
                  width="25"
                  height="25"
                  style={{ color: closeButtonColor || '#a1a1a1' }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            <button
              type="button"
              styleName={`main-button main-button-${status}  button-${widgetTypeCss} extra-large-button ${
                circleLoading ? '' : 'border-color'
              }`}
              onClick={() =>
                startTour(route, 'widget', { button_title: label })
              }
            >
              <div styleName={`lds-ring ${circleLoading ? 'show' : 'hide'}`}>
                <div />
                <div />
                <div />
                <div />
              </div>
              <div styleName="button-meta">
                {widgetTypeCss.includes('vertical') && <ThumbIcon />}
                <div styleName="button-label">{label}</div>
              </div>
              <div styleName="thumb-wrapper">
                {(previewVideoUrl || previewImageUrl) && (
                  <>
                    <video
                      poster={previewImageUrl}
                      playsInline
                      styleName="thumb"
                      src={previewVideoUrl}
                      onCanPlay={() => setVideoLoaded(true)}
                      muted
                      autoPlay
                      loop
                    />
                    <div
                      styleName={`thumb-overlay  ${!label ? 'clear' : ''}`}
                    />
                  </>
                )}
              </div>
            </button>
            {/* Chatbot bubble with background block */}
            <div
              onMouseOver={() => setCross(true)}
              onMouseOut={() => setCross(false)}
              styleName={`chatbot-bubble-block ${
                showChatBot ? 'show' : 'hide'
              } ${
                widgetTypeCss === 'circle'
                  ? 'bubble-top-circle'
                  : 'bubble-top-vertical'
              } ${layoutt === 'right' ? 'right' : ''}`}
            >
              {chatBotState !== undefined && chatBotState.length !== 0 && (
                // eslint-disable-next-line react/button-has-type
                <button
                  onMouseOver={() => setCross(true)}
                  styleName="cross-bubble-button"
                  style={{
                    width: 35,
                    height: 35,
                    marginBottom: 6,

                    // padding-top: 10;
                    // padding-bottom: 10;
                  }}
                  onClick={() => setShowChatBot(false)}
                >
                  <svg
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>

                  {/* &times; */}
                </button>
              )}
              {chatBotState &&
                chatBotState.map((item, index) => {
                  return (
                    <>
                      {loopThroughAllConditions(item?.condition).includes(
                        true
                      ) && (
                        <>
                          <div
                            key={index}
                            styleName={`initial-message-bubble ${
                              item.buttons.length === 1 && !item.text
                                ? 'transparent'
                                : ''
                            }`}
                          >
                            {item.title && (
                              <div styleName="message-title">{item.title}</div>
                            )}
                            {item.text && (
                              <div styleName="message-text">{item.text}</div>
                            )}
                            {item.users && (
                              <div styleName="support-block">
                                {item.users.map((user, index) => (
                                  <div styleName="user">
                                    <div className=" image">
                                      <img
                                        src={user.img}
                                        style={{
                                          objectFit: 'contain',
                                          width: '100%',
                                          height: '100%',
                                        }}
                                        alt=""
                                      />
                                    </div>
                                    <div styleName="name">{user.name}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                            {item.buttons &&
                              (item.buttons.length === 1 ? (
                                <SingleButton />
                              ) : (
                                <div styleName="bubble-buttons">
                                  {item.buttons.map((button) => (
                                    <button
                                      onClick={() =>
                                        onClickLink(button, 'button-array')
                                      }
                                      styleName={`bubble-btn ${
                                        button.fullWidth ? 'full' : ''
                                      }`}
                                    >
                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          gap: '2px',
                                          alignItems: 'start',
                                        }}
                                      >
                                        <p
                                          style={{
                                            fontWeight: '600',
                                            fontSize: '15px',
                                            margin: '0px',
                                          }}
                                        >
                                          {button.label}
                                        </p>
                                        {button.subTitle && (
                                          <p
                                            style={{
                                              fontSize: '10px',
                                              margin: '0px',
                                            }}
                                          >
                                            {button.subTitle}
                                          </p>
                                        )}
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              ))}
                          </div>
                        </>
                      )}
                    </>
                  );

                  function SingleButton() {
                    return (
                      <div styleName="bubble-buttons">
                        {item.buttons.map((button, idx) => (
                          <button
                            onClick={() => onClickLink(button, 'single-button')}
                            onMouseOver={() => {
                              setHoverIdx(index);
                            }}
                            onMouseOut={() => {
                              setHoverIdx(null);
                            }}
                            style={{
                              transition: 'none',
                              background:
                                hoverIdx === index
                                  ? primaryColor
                                  : 'rgba(251, 251, 251, 1)',
                              color: hoverIdx === index ? '#fff' : '#000',
                              border: '1px solid lightgrey',
                            }}
                            styleName={`bubble-btn ${
                              button.fullWidth ? 'full' : ''
                            }`}
                          >
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                              }}
                            >
                              {button.picArray &&
                                button.picArray.map((user, ind) => (
                                  <>
                                    <img
                                      src={user.img}
                                      style={
                                        ind === 0
                                          ? {
                                              width: '30px',
                                              height: '30px',
                                              borderRadius: '50%',
                                              objectFit: 'cover',
                                            }
                                          : {
                                              width: '30px',
                                              height: '30px',
                                              borderRadius: '50%',
                                              marginLeft: '-10px',
                                              objectFit: 'cover',
                                            }
                                      }
                                      alt=""
                                    />
                                  </>
                                ))}
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '2px',
                                  alignItems: 'start',
                                }}
                              >
                                <p
                                  style={{
                                    fontWeight: '600',
                                    fontSize: '15px',
                                    margin: '0px',
                                  }}
                                >
                                  {button.label}
                                </p>
                                {button.subTitle && (
                                  <p
                                    style={{
                                      fontSize: '10px',
                                      margin: '0px',
                                    }}
                                  >
                                    {button.subTitle}
                                  </p>
                                )}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    );
                  } // End single button
                })}
            </div>
          </div>
        )}
      </Transition>
    )
  );
};

export default Button;
