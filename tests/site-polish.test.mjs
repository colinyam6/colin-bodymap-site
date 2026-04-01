import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test('styles include focus, reveal, energized, and reduced-motion polish', () => {
  const css = read('styles.css');

  [
    '.reveal.is-visible',
    '.hero.is-energized .hero__cta',
    '.hero__cta:focus-visible',
    '.game-zone__panel:hover .status-fill',
    '@media (prefers-reduced-motion: reduce)'
  ].forEach((token) => {
    assert.match(css, new RegExp(escapeRegExp(token)));
  });
});
