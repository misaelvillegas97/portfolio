const controls = new WeakMap<HTMLDetailsElement, (open: boolean) => void>();

export function setDisclosureOpen(details: HTMLDetailsElement | null, open: boolean) {
  if (!details) return;
  const control = controls.get(details);
  if (control) control(open);
  else details.open = open;
}

export function mountDisclosureMotion(root: HTMLElement, onLayoutChange: () => void) {
  const cleanups: Array<() => void> = [];
  const easing = getComputedStyle(root).getPropertyValue('--ease').trim();

  for (const details of root.querySelectorAll<HTMLDetailsElement>('details')) {
    const summary = details.querySelector<HTMLElement>(':scope > summary');
    const panel = details.querySelector<HTMLElement>(':scope > .disclosure-body, :scope > .navigation__mobile-panel, :scope > .hero__sectors-content');
    if (!summary || !panel || typeof panel.animate !== 'function') continue;
    const floating = !panel.classList.contains('disclosure-body');
    const direction = details.classList.contains('hero__sectors') ? 8 : -8;
    let desiredOpen = details.open;
    let animation: Animation | null = null;

    const change = (open: boolean, resized = false) => {
      if (!resized && desiredOpen === open && (animation || details.open === open)) return;
      const wasOpen = details.open;
      const height = wasOpen ? panel.getBoundingClientRect().height : 0;
      const opacity = wasOpen ? getComputedStyle(panel).opacity : '0';
      const transform = wasOpen ? getComputedStyle(panel).transform : `translateY(${direction}px) scale(0.985)`;
      const previous = animation;
      animation = null;
      previous?.cancel();
      desiredOpen = open;
      // Keep native content rendered until its exit finishes; rapid toggles start at the current frame.
      details.open = true;
      details.toggleAttribute('data-closing', !open);
      summary.setAttribute('aria-expanded', String(open));
      panel.inert = !open;

      const frames = floating
        ? [{ opacity, transform }, { opacity: open ? '1' : '0', transform: open ? 'none' : `translateY(${direction}px) scale(0.985)` }]
        : [{ height: `${height}px` }, { height: open ? `${panel.getBoundingClientRect().height}px` : '0px' }];
      const running = panel.animate(frames, { duration: open ? 380 : 240, easing, fill: 'both' });
      animation = running;
      running.onfinish = () => {
        if (animation !== running) return;
        animation = null;
        details.open = desiredOpen;
        panel.inert = false;
        details.removeAttribute('data-closing');
        running.cancel();
        if (!floating) onLayoutChange();
      };
    };
    const toggle = (event: MouseEvent) => {
      event.preventDefault();
      change(!(animation ? desiredOpen : details.open));
    };
    const observer = !floating && typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => { if (animation && desiredOpen) change(true, true); })
      : null;
    if (panel.firstElementChild) observer?.observe(panel.firstElementChild);
    summary.addEventListener('click', toggle);
    controls.set(details, change);
    cleanups.push(() => {
      summary.removeEventListener('click', toggle);
      observer?.disconnect();
      const previous = animation;
      animation = null;
      previous?.cancel();
      details.open = desiredOpen;
      details.removeAttribute('data-closing');
      summary.removeAttribute('aria-expanded');
      panel.inert = false;
      controls.delete(details);
    });
  }

  return () => cleanups.forEach(cleanup => cleanup());
}
