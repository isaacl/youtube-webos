const dispatchWebOSPauseEvent = () => {
  const evt = new Event('webOSPause');
  document.dispatchEvent(evt);
};

const interceptForegroundLossEvent = (evt: Event) => {
  dispatchWebOSPauseEvent();
  evt.stopImmediatePropagation();
};

window.addEventListener('blur', interceptForegroundLossEvent, true);
document.addEventListener(
  'visibilitychange',
  interceptForegroundLossEvent,
  true
);

window.addEventListener(
  'focus',
  (evt) => {
    evt.stopImmediatePropagation();
  },
  true
);

const forceDocumentVisibilityProperty = (
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
    }
  });
};

forceDocumentVisibilityProperty('visibilityState', 'visible');
forceDocumentVisibilityProperty('hidden', false);
forceDocumentVisibilityProperty('webkitVisibilityState', 'visible');
forceDocumentVisibilityProperty('webkitHidden', false);
