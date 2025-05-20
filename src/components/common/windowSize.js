const resizeEventTarget = new EventTarget();

function emitResize() {
  resizeEventTarget.dispatchEvent(new CustomEvent('resize', { detail: window.innerWidth }));
}

window.addEventListener('resize', emitResize);

function getCurrentWidth() {
  return window.innerWidth;
}

function subscribe(callback) {
  const handler = (e) => callback(e.detail);
  resizeEventTarget.addEventListener('resize', handler);  //Detectar los cambios en tiempo real
  return () => resizeEventTarget.removeEventListener('resize', handler);
}

export { getCurrentWidth, subscribe };