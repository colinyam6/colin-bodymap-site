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
    'hero__poster',
    'hero__blend',
    'hero__ambient',
    'hero__flare',
    'section-deco--hero-mid',
    'section-deco--hero-right',
    'Heat Mode Online'
  ].forEach((token) => {
    assert.match(html, new RegExp(escapeRegExp(token)));
  });

  [
    'hero__blade',
    'hero__slash'
  ].forEach((token) => {
    assert.doesNotMatch(html, new RegExp(escapeRegExp(token)));
  });
});

test('hero styles define the warm palette and body-stage hooks', () => {
  const css = read('styles.css');

  [
    '--accent-fire:',
    '--accent-gold:',
    'assets/hero-energy-warrior-cutout.png',
    'assets/ambient-soft-motifs.png',
    'assets/ambient-banner-emberflow.png',
    'assets/ambient-vertical-plume.png',
    '.hero {',
    '.hero__body-stage {',
    '.hero__body-stage::before {',
    '.hero__body-stage::after {',
    '.hero__poster {',
    '.hero__poster::before {',
    '.hero__blend {',
    '.hero__ambient {',
    '.section-deco--hero-mid {',
    '.section-deco--hero-right {',
    'drop-shadow(0 0 34px rgba(255, 138, 54, 0.2))',
    '@keyframes decoFloat'
  ].forEach((token) => {
    assert.match(css, new RegExp(escapeRegExp(token)));
  });

  [
    '.hero__blade {',
    '.hero__slash {',
    '@keyframes bladeSweep',
    '@keyframes bladeFlash',
    'assets/ambient-inserts.png'
  ].forEach((token) => {
    assert.doesNotMatch(css, new RegExp(escapeRegExp(token)));
  });
});
