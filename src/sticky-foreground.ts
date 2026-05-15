const dispatchWebOSPauseEvent = () => {
  const evt = new Event('webOSPause');
  document.dispatchEvent(evt);
};

const interceptBackgroundEvent = (evt: Event) => {
  dispatchWebOSPauseEvent();
  evt.stopImmediatePropagation();
};

window.addEventListener('blur', interceptBackgroundEvent, true);
document.addEventListener('visibilitychange', interceptBackgroundEvent, true);

window.addEventListener(
  'focus',
  (evt) => {
    evt.stopImmediatePropagation();
  },
  true
);

Object.defineProperty(Document.prototype, 'visibilityState', {
  configurable: true,
  get() {
    return 'visible';
  }
});

Object.defineProperty(Document.prototype, 'hidden', {
  configurable: true,
  get() {
    return false;
  }
});

Object.defineProperty(Document.prototype, 'webkitVisibilityState', {
  configurable: true,
  get() {
    return 'visible';
  }
});

Object.defineProperty(Document.prototype, 'webkitHidden', {
  configurable: true,
  get() {
    return false;
  }
});
