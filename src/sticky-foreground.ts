const captureEventOptions = { capture: true } as const;

const pauseActiveVideo = () => {
  const video = document.querySelector('video');
  if (!(video instanceof HTMLVideoElement) || video.paused) return;
  void video.pause();
};

const isContainerLifecycleEvent = (evt: Event) =>
  evt.target === window ||
  evt.target === document ||
  evt.target === document.body;

const interceptBackgroundEvent = (evt: Event) => {
  if (!isContainerLifecycleEvent(evt)) return;
  pauseActiveVideo();
  evt.stopImmediatePropagation();
};

const interceptForegroundEvent = (evt: Event) => {
  if (!isContainerLifecycleEvent(evt)) return;
  evt.stopImmediatePropagation();
};

window.addEventListener('blur', interceptBackgroundEvent, captureEventOptions);
window.addEventListener(
  'webOSAppPause',
  interceptBackgroundEvent,
  captureEventOptions
);
window.addEventListener('pause', interceptBackgroundEvent, captureEventOptions);
document.addEventListener(
  'visibilitychange',
  interceptBackgroundEvent,
  captureEventOptions
);
document.addEventListener(
  'webOSAppPause',
  interceptBackgroundEvent,
  captureEventOptions
);
document.addEventListener(
  'pause',
  interceptBackgroundEvent,
  captureEventOptions
);

window.addEventListener('focus', interceptForegroundEvent, captureEventOptions);
window.addEventListener(
  'webOSAppResume',
  interceptForegroundEvent,
  captureEventOptions
);
window.addEventListener(
  'resume',
  interceptForegroundEvent,
  captureEventOptions
);
document.addEventListener(
  'webOSAppResume',
  interceptForegroundEvent,
  captureEventOptions
);
document.addEventListener(
  'resume',
  interceptForegroundEvent,
  captureEventOptions
);

const overrideVisibilityProperty = (
  property:
    | 'visibilityState'
    | 'hidden'
    | 'webkitVisibilityState'
    | 'webkitHidden',
  value: DocumentVisibilityState | boolean
) => {
  Object.defineProperty(Document.prototype, property, {
    configurable: true,
    get() {
      return value;
    },
    set() {
      // Keep forced visibility state immutable.
    }
  });
};

overrideVisibilityProperty('visibilityState', 'visible');
overrideVisibilityProperty('hidden', false);
overrideVisibilityProperty('webkitVisibilityState', 'visible');
overrideVisibilityProperty('webkitHidden', false);
