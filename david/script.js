
(() => {
  'use strict';

  const track = document.querySelector('.scroll-track');
  const stage = document.getElementById('video-stage');
  const baseVideo = document.getElementById('video-base');
  const offsetVideo = document.getElementById('time-offset-video');

  const playButton = document.getElementById('play-toggle');
  const audioButton = document.getElementById('audio-toggle');
  const seekBar = document.getElementById('seek-bar');
  const volumeBar = document.getElementById('volume-bar');
  const currentTimeDisplay = document.getElementById('current-time');
  const durationDisplay = document.getElementById('duration');

  if (!track || !stage || !baseVideo || !offsetVideo) {
    console.error('Time Offset Window: a required video or layout element is missing.');
    return;
  }

  const OFFSET_SECONDS = -8;

  const MIN_RADIUS = 60;
  const MAX_RADIUS = 500;
  const DEFAULT_RADIUS = 180;

  let duration = 0;
  let lastOffsetTarget = -1;
  let isScrubbing = false;
  let isPlayingFromControls = false;
  let isSeeking = false;
  let scrollFrame = 0;

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return '0:00';

    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60);

    return `${minutes}:${String(remaining).padStart(2, '0')}`;
  }

  function updatePlayButton() {
    if (!playButton) return;

    const playing = !baseVideo.paused && !baseVideo.ended;

    playButton.textContent = playing ? 'PAUSE' : 'PLAY';
    playButton.setAttribute(
      'aria-label',
      playing ? 'Pause video' : 'Play video'
    );
  }

  function updateAudioButton() {
    if (!audioButton) return;

    const muted = baseVideo.muted || baseVideo.volume === 0;

    audioButton.textContent = muted ? 'SOUND OFF' : 'SOUND ON';
    audioButton.setAttribute(
      'aria-label',
      muted ? 'Unmute video' : 'Mute video'
    );
    audioButton.setAttribute('aria-pressed', String(!muted));
  }

  function updateTimeline() {
    if (!isScrubbing && seekBar && duration > 0) {
      seekBar.value = String(
        (baseVideo.currentTime / duration) * 100
      );
    }

    if (currentTimeDisplay) {
      currentTimeDisplay.textContent = formatTime(
        baseVideo.currentTime
      );
    }
  }

  function setScrollTrackHeight() {
    // Give scrolling enough distance to resize the circle.
    // The video time is never derived from scroll position.
    track.style.height = '200vh';
    updateCircleRadius();
  }

  function updateDuration() {
    duration = Number.isFinite(baseVideo.duration)
      ? baseVideo.duration
      : 0;

    if (durationDisplay) {
      durationDisplay.textContent = formatTime(duration);
    }

    setScrollTrackHeight();
    syncOffset(baseVideo.currentTime, true);
    updateTimeline();
  }

  function setVideoTime(video, time, force = false) {
    if (
      !video ||
      video.readyState < 1 ||
      !Number.isFinite(time)
    ) {
      return;
    }

    if (
      force ||
      Math.abs(video.currentTime - time) > 0.035
    ) {
      try {
        video.currentTime = time;
      } catch (_) {
        // Ignore seeks rejected before the media is ready.
      }
    }
  }

  function syncOffset(baseTime, force = false) {
    if (!offsetVideo || !duration) return;

    const target = Math.max(
      0,
      Math.min(duration, baseTime + OFFSET_SECONDS)
    );

    if (
      force ||
      lastOffsetTarget < 0 ||
      Math.abs(target - lastOffsetTarget) > 0.035
    ) {
      lastOffsetTarget = target;
      setVideoTime(offsetVideo, target, force);
    }
  }

  // Scroll changes only the radius of the offset circle.
  function updateCircleRadius() {
    scrollFrame = 0;

    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );

    const progress = Math.min(
      1,
      Math.max(0, window.scrollY / maxScroll)
    );

    const radius =
      MIN_RADIUS + progress * (MAX_RADIUS - MIN_RADIUS);

    document.documentElement.style.setProperty(
      '--window-radius',
      `${radius}px`
    );
  }

  function scheduleCircleUpdate() {
    if (!scrollFrame) {
      scrollFrame = window.requestAnimationFrame(updateCircleRadius);
    }
  }

  function updateCursor(event) {
    const rect = stage.getBoundingClientRect();

    document.documentElement.style.setProperty(
      '--cursor-x',
      `${event.clientX - rect.left}px`
    );

    document.documentElement.style.setProperty(
      '--cursor-y',
      `${event.clientY - rect.top}px`
    );
  }

  function hideCursorWindow() {
    document.documentElement.style.setProperty(
      '--cursor-x',
      '-1000px'
    );

    document.documentElement.style.setProperty(
      '--cursor-y',
      '-1000px'
    );
  }

  async function playVideos() {
    isPlayingFromControls = true;

    try {
      if (baseVideo.ended) {
        setVideoTime(baseVideo, 0, true);
        lastOffsetTarget = -1;
        syncOffset(0, true);
      }

      await baseVideo.play();

      offsetVideo.play().catch(() => {});
    } catch (error) {
      isPlayingFromControls = false;
      console.warn('Video playback could not start.', error);
    }

    updatePlayButton();
  }

  function pauseVideos() {
    baseVideo.pause();
    offsetVideo.pause();

    isPlayingFromControls = false;

    syncOffset(baseVideo.currentTime);
    updatePlayButton();
  }

  function seekTo(time) {
    if (!duration) return;

    const target = Math.max(0, Math.min(duration, time));

    lastOffsetTarget = -1;
    setVideoTime(baseVideo, target, true);
    syncOffset(target, true);
    updateTimeline();
  }

  if (playButton) {
    playButton.addEventListener('click', () => {
      if (baseVideo.paused || baseVideo.ended) {
        playVideos();
      } else {
        pauseVideos();
      }
    });
  }

  if (audioButton) {
    audioButton.addEventListener('click', () => {
      if (baseVideo.muted || baseVideo.volume === 0) {
        baseVideo.muted = false;

        if (baseVideo.volume === 0) {
          baseVideo.volume = 1;

          if (volumeBar) {
            volumeBar.value = '1';
          }
        }
      } else {
        baseVideo.muted = true;
      }

      updateAudioButton();
    });
  }

  if (volumeBar) {
    volumeBar.value = String(baseVideo.volume);

    volumeBar.addEventListener('input', () => {
      baseVideo.volume = Number(volumeBar.value);
      baseVideo.muted = baseVideo.volume === 0;
      updateAudioButton();
    });
  }

  if (seekBar) {
    function beginScrubbing() {
      isScrubbing = true;
    }

    function previewSeek() {
      isScrubbing = true;

      if (duration > 0 && currentTimeDisplay) {
        const previewTime =
          (Number(seekBar.value) / 100) * duration;

        currentTimeDisplay.textContent = formatTime(previewTime);
      }
    }

    function finishSeeking() {
      if (!isScrubbing) return;

      seekTo((Number(seekBar.value) / 100) * duration);
      isScrubbing = false;
      updateTimeline();

      if (isPlayingFromControls && !baseVideo.paused) {
        offsetVideo.play().catch(() => {});
      }
    }

    seekBar.addEventListener('pointerdown', beginScrubbing);
    seekBar.addEventListener('input', previewSeek);
    seekBar.addEventListener('change', finishSeeking);
    seekBar.addEventListener('pointerup', finishSeeking);
    seekBar.addEventListener('pointercancel', finishSeeking);
    seekBar.addEventListener('blur', finishSeeking);
  }

  baseVideo.addEventListener('loadedmetadata', updateDuration);
  baseVideo.addEventListener('durationchange', updateDuration);

  baseVideo.addEventListener('timeupdate', () => {
    updateTimeline();

    if (isPlayingFromControls && !isScrubbing) {
      syncOffset(baseVideo.currentTime);
    }
  });

  baseVideo.addEventListener('play', updatePlayButton);
  baseVideo.addEventListener('pause', updatePlayButton);

  baseVideo.addEventListener('ended', () => {
    isPlayingFromControls = false;
    offsetVideo.pause();
    updatePlayButton();
    updateTimeline();
  });

  baseVideo.addEventListener('volumechange', updateAudioButton);

  baseVideo.addEventListener('seeking', () => {
    if (isSeeking) return;

    isSeeking = true;
    lastOffsetTarget = -1;
    syncOffset(baseVideo.currentTime, true);
  });

  baseVideo.addEventListener('seeked', () => {
    syncOffset(baseVideo.currentTime, true);
    isSeeking = false;
  });

  offsetVideo.addEventListener('loadedmetadata', () => {
    lastOffsetTarget = -1;
    syncOffset(baseVideo.currentTime, true);
  });

  offsetVideo.addEventListener('seeked', () => {
    if (!duration) return;

    const expected = Math.max(
      0,
      Math.min(duration, baseVideo.currentTime + OFFSET_SECONDS)
    );

    if (Math.abs(offsetVideo.currentTime - expected) > 0.2) {
      lastOffsetTarget = -1;
      syncOffset(baseVideo.currentTime, true);
    }
  });

  stage.addEventListener('pointermove', updateCursor, {
    passive: true
  });

  stage.addEventListener('pointerleave', hideCursorWindow, {
    passive: true
  });

  window.addEventListener('scroll', scheduleCircleUpdate, {
    passive: true
  });

  window.addEventListener('resize', setScrollTrackHeight, {
    passive: true
  });

  document.documentElement.style.setProperty(
    '--window-radius',
    `${DEFAULT_RADIUS}px`
  );

  if (baseVideo.readyState >= 1) {
    updateDuration();
  } else {
    setScrollTrackHeight();
  }

  updatePlayButton();
  updateAudioButton();
  updateTimeline();
  updateCircleRadius();
})();
