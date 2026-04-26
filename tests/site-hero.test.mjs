import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test('hero markup includes the fiery body-stage layers', () => {
  const html = read('index.html');

  [
    'data-parallax-root',
    'hero__body-stage',
    'hero__body',
    'hero__heat-ring',
    'hero__flare',
    'Heat Mode Online'
  ].forEach((token) => {
    assert.match(html, new RegExp(escapeRegExp(token)));
  });
});

test('hero styles define the warm palette and body-stage hooks', () => {
  const css = read('styles.css');

  [
    '--accent-fire:',
    '--accent-gold:',
    'assets/hero-fiery-stage.png',
    '.hero {',
    '.hero__body-stage {',
    '.hero__heat-ring {',
    '.hero__body::before',
    '@keyframes heatPulse'
  ].forEach((token) => {
    assert.match(css, new RegExp(escapeRegExp(token)));
  });
});
