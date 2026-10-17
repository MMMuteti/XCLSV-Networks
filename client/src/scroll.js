export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToHash(hash) {
  const target = hash && document.querySelector(hash);
  if (!target) return false;
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  if (history.replaceState) history.replaceState(null, "", hash);
  return true;
}
