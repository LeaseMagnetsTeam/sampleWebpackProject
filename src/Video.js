import React, { useEffect, useReducer, useState } from 'react';
import VideoLoader from './VideoLoader';
import './VideoMagnet.css';

const Video = ({
  source: parentSource,
  isPlaying,
  setIsPlaying,
  onTimeUpdate,
  playbackRate,
  newVideoTime,
  setNewVideoTime,
  isMuted,
  playsInline,
  loop,
  previewImageUrl,
  roundedVideoPlayer,
  iframeVideoUnderlayToggle,
  setIframeVideoUnderlayToggle,
  history,
  firstVideoRef,
  secondVideoRef,
  ...videoProps
}) => {
  // Whether the first or second <video> has (or is loading) the current source
  const [currentSourceFirst, setCurrentSourceFirst] = useState(true);

  // Track the current source (=== parentSource) and the previous source
  const [[source, oldSource], addNewSource] = useReducer(
    ([prevSource], newSource) => [newSource, prevSource],
    [parentSource]
  );
  useEffect(() => {
    // Without this check, this effect causes an unneeded transition when the component mounts
    if (parentSource !== source) {
      addNewSource(parentSource);
      setCurrentSourceFirst((x) => !x);
    }
  }, [parentSource, source]);

  // Callback refs might be more "best practice"-y to use here to prevent the
  // refs from being null as often, but they're still null at the very beginning

  // Since it's changed by a state (not just a static ref), empirically it
  // seems to be fine to use `video` as a useEffect dep, just may be null or undefined
  const video = (currentSourceFirst ? firstVideoRef : secondVideoRef).current;
  const oldVideo = (currentSourceFirst ? secondVideoRef : firstVideoRef)
    .current;

  const [firstVideoSource, secondVideoSource] = currentSourceFirst
    ? [source, oldSource]
    : [oldSource, source];

  // True when a video has loaded for the first time. Used to show a loading spinner
  // instead of just a white screen (mainly needed for inline layout)
  const [initialVideoLoaded, setInitialVideoLoaded] = useReducer(
    () => true,
    false
  );

  const handleTimeUpdate = () => {
    const { currentTime, duration } = video || {};
    onTimeUpdate(currentTime, duration);
  };

  // If source state is updated
  useEffect(() => {
    if (video) video.load();
  }, [video, source]);

  // If parent updates newVideoTime prop to change the video time
  useEffect(() => {
    if (video && video.readyState && newVideoTime >= 0) {
      video.currentTime = newVideoTime;
      setNewVideoTime(-1); // Reset newVideoTime since we updated the video time
    }
  }, [video, newVideoTime, setNewVideoTime]);

  // If parent updates isPlaying prop
  useEffect(() => {
    const effect = async () => {
      if (video) {
        if (isPlaying) {
          try {
            await video.play(); // Not all browsers return Promises
          } catch (error) {
            // Probably couldn't play because the user hasn't interacted with the page,
            // so make sure we show the "play" button by setting isPlaying
            console.error(error);
            setIsPlaying(false);
          }
        } else {
          video.pause();
        }
      }
    };
    effect();
  }, [video, isPlaying, setIsPlaying]);

  // If parent updates playbackRate prop
  useEffect(() => {
    if (video) {
      video.playbackRate = playbackRate;
    }
  }, [video, playbackRate]);

  const commonVideoProps = {
    ...videoProps,
    preload: 'auto',
    type: 'video/mp4',
    autoPlay: isPlaying,
    muted: isMuted,
    loop,
    playsInline, // Used for fullscreen on iOS
    onCanPlay: () => {
      if (!initialVideoLoaded) setInitialVideoLoaded();
      if (oldVideo) oldVideo.pause();
    },
    onEnded: () => setIsPlaying(false),
    onTimeUpdate: handleTimeUpdate,
  };

  const IS_DESKTOP = !window.matchMedia('only screen and (max-width: 600px)')
    .matches;

  const sizeRecommendation = () => {
    return IS_DESKTOP ? 150 : 130;
  };

  return (
    <>
      {!initialVideoLoaded && <VideoLoader />}

      {/* Conditional rendering because one video source may be null before any page changes occur
          It should be possible to e.g. not render the first video when !currentSourceFirst and no videos
          are loading, but the logic for that is tricky and may not be smooth enough to prevent a black flicker */}
      {firstVideoSource && (
        <video
          poster={history.length === 0 && previewImageUrl}
          ref={firstVideoRef}
          src={firstVideoSource}
          style={{
            zIndex: currentSourceFirst ? 2 : 1,
            borderRadius: iframeVideoUnderlayToggle ? '10%' : '0%',
            borderBottomLeftRadius: iframeVideoUnderlayToggle
              ? '10%'
              : roundedVideoPlayer
              ? '10px'
              : '0px',
            borderBottomRightRadius: iframeVideoUnderlayToggle
              ? '10%'
              : roundedVideoPlayer
              ? '10px'
              : '0px',
            width: iframeVideoUnderlayToggle ? sizeRecommendation() : '',
            height: iframeVideoUnderlayToggle ? sizeRecommendation() : '',
            position: iframeVideoUnderlayToggle ? 'absolute' : 'static',
            right: iframeVideoUnderlayToggle ? 20 : '',
            top: iframeVideoUnderlayToggle ? 80 : '',
            transition: 'all ease-in-out 1s',
          }}
          {...commonVideoProps}
          // muted
        />
      )}

      <svg
        style={{
          width: 32,
          height: 32,
          // change the position of the play button depending on the location and size of video
          right: IS_DESKTOP ? 77 : 66,
          top: IS_DESKTOP ? 140 : 127,
          position: 'absolute',
          zIndex: 103,
          opacity: !isPlaying && iframeVideoUnderlayToggle ? 1 : 0,
          pointerEvents:
            !isPlaying && iframeVideoUnderlayToggle ? 'auto' : 'none',
        }}
        xmlns="https://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className=""
      >
        <path
          fillRule="evenodd"
          d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
          clipRule="evenodd"
        />
      </svg>

      {(secondVideoSource || history.length === 0) && (
        <video
          poster={history.length === 0 && previewImageUrl}
          ref={secondVideoRef}
          src={secondVideoSource}
          style={{
            zIndex: !currentSourceFirst ? 2 : 1,
            borderRadius: iframeVideoUnderlayToggle ? '10%' : '0%',
            borderBottomLeftRadius: iframeVideoUnderlayToggle
              ? '10%'
              : roundedVideoPlayer
              ? '10px'
              : '0px',
            borderBottomRightRadius: iframeVideoUnderlayToggle
              ? '10%'
              : roundedVideoPlayer
              ? '10px'
              : '0px',
            width: iframeVideoUnderlayToggle ? sizeRecommendation() : '',
            height: iframeVideoUnderlayToggle ? sizeRecommendation() : '',
            position: iframeVideoUnderlayToggle ? 'absolute' : 'static',
            right: iframeVideoUnderlayToggle ? 20 : '',
            top: iframeVideoUnderlayToggle ? 80 : '',
            transition: 'all ease-in-out 1s',
          }}
          {...commonVideoProps}
        />
      )}
    </>
  );
};

export default Video;
