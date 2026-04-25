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
