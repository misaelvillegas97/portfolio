import assert from 'node:assert/strict';
import test from 'node:test';
import { mountDisclosureMotion, setDisclosureOpen } from '../src/lib/disclosureMotion.ts';

function fixture() {
  let click;
  const attrs = new Map();
  const animations = [];
  const summary = {
    addEventListener: (name, handler) => { if (name === 'click') click = handler; },
    removeEventListener: () => { click = null; },
    setAttribute: (name, value) => attrs.set(name, value),
    removeAttribute: name => attrs.delete(name),
  };
  const panel = {
    classList: { contains: name => name === 'disclosure-body' },
    getBoundingClientRect: () => ({ height: 240 }),
    animate: () => {
      const animation = { onfinish: null, cancelled: false, cancel() { this.cancelled = true; } };
      animations.push(animation);
      return animation;
    },
    inert: false,
  };
  const details = {
    open: false,
    classList: { contains: () => false },
    querySelector: selector => selector.includes('summary') ? summary : panel,
    toggleAttribute: (name, value) => value ? attrs.set(name, '') : attrs.delete(name),
    removeAttribute: name => attrs.delete(name),
  };
  const root = { querySelectorAll: () => [details] };
  return { root, details, panel, animations, attrs, click: () => click({ preventDefault() {} }) };
}

test('disclosures wait for exit, reverse on repeated input and ignore stale completions', () => {
  const originalStyle = globalThis.getComputedStyle;
  globalThis.getComputedStyle = () => ({ getPropertyValue: () => 'ease-out' });
  try {
    const f = fixture();
    let layouts = 0;
    const cleanup = mountDisclosureMotion(f.root, () => layouts++);
    f.click();
    assert.equal(f.details.open, true);
    assert.equal(f.attrs.get('aria-expanded'), 'true');
    f.animations[0].onfinish();
    assert.equal(layouts, 1, 'refresh the next scroll effects after layout settles');
    setDisclosureOpen(f.details, false);
    const closing = f.animations.at(-1);
    assert.equal(f.details.open, true, 'native content remains rendered during exit');
    assert.equal(f.panel.inert, true, 'closing content leaves the tab order');
    f.click();
    assert.equal(closing.cancelled, true);
    closing.onfinish();
    assert.equal(layouts, 1, 'obsolete exit must not refresh a stale layout');
    assert.equal(f.details.open, true, 'obsolete exit cannot close the reopened disclosure');
    f.animations.at(-1).onfinish();
    assert.equal(f.attrs.has('data-closing'), false);
    setDisclosureOpen(f.details, false);
    f.animations.at(-1).onfinish();
    assert.equal(f.details.open, false);
    assert.equal(f.panel.inert, false);
    f.details.open = true;
    f.click();
    assert.equal(f.attrs.get('aria-expanded'), 'false', 'respect native opening such as browser find');
    f.animations.at(-1).onfinish();
    cleanup();
    assert.equal(f.attrs.has('aria-expanded'), false, 'cleanup restores native semantics');
    setDisclosureOpen(f.details, true);
    assert.equal(f.details.open, true, 'unenhanced fallback stays native');
  } finally { globalThis.getComputedStyle = originalStyle; }
});
