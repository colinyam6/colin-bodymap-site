import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { loadScriptApi } from './script-api.mjs';

const {
  shouldEnablePointerEffects
} = loadScriptApi();

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('pointer-driven effects run only on fine hover devices', () => {
  assert.equal(shouldEnablePointerEffects(false, true), false);
  assert.equal(shouldEnablePointerEffects(false, false), false);
  assert.equal(shouldEnablePointerEffects(true, false), false);
  assert.equal(shouldEnablePointerEffects(true, true), true);
});

test('mobile and coarse-pointer layouts drop the heaviest decorative layers', () => {
  const css = read('styles.css');
  const mobilePerformanceBlock = css.match(/@media\s*\(max-width:\s*860px\),\s*\(pointer:\s*coarse\)\s*\{[\s\S]+?\n\}/);

  assert.ok(mobilePerformanceBlock, 'expected a mobile/coarse-pointer performance media query');

  [
    '.hero__backdrop::after',
    '.hero__copy::after',
    '.hero__poster::before',
    '.hero__poster::after',
    '.hero__ambient',
    '.section-deco',
    '.body-diagram__poster::before',
    '.body-diagram__poster::after',
    '.body-diagram__blend'
  ].forEach((selector) => {
    assert.match(mobilePerformanceBlock[0], new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]+?display:\\s*none`));
  });
});

test('large visual assets have optimized webp variants used by the stylesheet', () => {
  const css = read('styles.css');
  const assets = [
    'ambient-banner-constellation-cutout.webp',
    'ambient-banner-emberflow.webp',
    'ambient-horizon-glow.webp',
    'ambient-soft-motifs.webp',
    'ambient-vertical-cascade.webp',
    'body-map-energy-warrior-cutout.webp',
    'cards-theme-atlas-cutout.webp',
    'hero-energy-warrior-cutout.webp'
  ];
  let totalBytes = 0;

  assets.forEach((asset) => {
    const path = new URL(`../assets/${asset}`, import.meta.url);

    assert.ok(existsSync(path), `${asset} should exist`);
    assert.match(css, new RegExp(`assets/${asset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
    totalBytes += statSync(path).size;
  });

  assert.ok(totalBytes <= 5_000_000, `optimized art should stay under 5MB, got ${totalBytes}`);
});
