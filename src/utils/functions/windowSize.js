const resizeEventTarget = new EventTarget();

//Se usa el objeto global window para detectar el width
function emitResize() {
  resizeEventTarget.dispatchEvent(new CustomEvent('resize', { detail: window.innerWidth }));
}

window.addEventListener('resize', emitResize);

function getCurrentWidth() {
  return window.innerWidth;
}

//Detectar los cambios en tiempo real
function subscribe(callback) {
  const handler = (e) => callback(e.detail);
  resizeEventTarget.addEventListener('resize', handler);
  return () => resizeEventTarget.removeEventListener('resize', handler);
}

export { getCurrentWidth, subscribe };