import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test('styles include active map, focus, tilt, and reduced-motion polish', () => {
  const css = read('styles.css');

  [
    '.body-info.is-active',
    '.body-diagram__hotspot.is-active',
    '.profile-card.is-tilting',
    '.hero__cta:focus-visible',
    '@media (prefers-reduced-motion: reduce)'
  ].forEach((token) => {
    assert.match(css, new RegExp(escapeRegExp(token)));
  });
});

test('hero bottom glow uses a feathered mask instead of a visible rectangular band', () => {
  const css = read('styles.css');
  const match = css.match(/\.section-deco--hero-bottom\s*\{[^}]+\}/);

  assert.ok(match, 'expected a .section-deco--hero-bottom block');
  assert.match(match[0], /radial-gradient\(ellipse/i);
  assert.doesNotMatch(match[0], /mask-image:\s*linear-gradient\(90deg/i);
});

test('hero ambient floor glows are masked so they do not read as hard-edged blocks', () => {
  const css = read('styles.css');

  [
    '.hero__ambient--left',
    '.hero__ambient--lower'
  ].forEach((selector) => {
    const match = css.match(new RegExp(`${selector.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\s*\\{[^}]+\\}`));

    assert.ok(match, `expected a ${selector} block`);
    assert.match(match[0], /mask-image:/i);
    assert.match(match[0], /-webkit-mask-image:/i);
  });
});

test('body map top atmosphere uses a transparent constellation overlay instead of a dark banner slab', () => {
  const css = read('styles.css');
  const match = css.match(/\.section--map::before\s*\{[^}]+\}/);

  assert.ok(match, 'expected a .section--map::before block');
  assert.match(css, /--art-constellation:\s*image-set\([^;]+ambient-banner-constellation-cutout\.webp[^;]+ambient-banner-constellation-cutout\.png/);
  assert.match(match[0], /var\(--art-constellation\)/);
  assert.match(match[0], /radial-gradient\(ellipse/i);
});
