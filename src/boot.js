let ready = false;
const waiters = new Set();

export function whenReady(fn) {
  if (ready) {
    fn();
    return () => {};
  }
  waiters.add(fn);
  return () => waiters.delete(fn);
}

export function markReady() {
  if (ready) return;
  ready = true;
  document.documentElement.classList.remove("is-booting");
  waiters.forEach((fn) => fn());
  waiters.clear();
}
