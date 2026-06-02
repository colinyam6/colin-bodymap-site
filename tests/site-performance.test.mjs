import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { loadScriptApi } from './script-api.mjs';

const {
  shouldUseLiteMode,
  shouldEnablePointerEffects
} = loadScriptApi();

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

const getRuleBlock = (css, selector, startIndex = 0) => {
  const selectorIndex = css.indexOf(selector, startIndex);

  assert.notEqual(selectorIndex, -1, `expected ${selector}`);

  const openIndex = css.indexOf('{', selectorIndex);
  let depth = 0;

  for (let index = openIndex; index < css.length; index += 1) {
    if (css[index] === '{') {
      depth += 1;
    } else if (css[index] === '}') {
      depth -= 1;

      if (depth === 0) {
        return css.slice(selectorIndex, index + 1);
      }
    }
  }

  throw new Error(`could not parse ${selector}`);
};

const getMobilePerformanceBlock = (css) => getRuleBlock(css, '@media (max-width: 860px), (pointer: coarse)');

test('pointer-driven effects run only on fine hover devices', () => {
  assert.equal(shouldEnablePointerEffects(false, true), false);
  assert.equal(shouldEnablePointerEffects(false, false), false);
  assert.equal(shouldEnablePointerEffects(true, false), false);
  assert.equal(shouldEnablePointerEffects(true, true), true);
  assert.equal(shouldEnablePointerEffects(true, true, true), false);
});

test('low power devices use the lightweight rendering mode', () => {
  assert.equal(shouldUseLiteMode({ deviceMemory: 2, hardwareConcurrency: 8 }), true);
  assert.equal(shouldUseLiteMode({ deviceMemory: 8, hardwareConcurrency: 2 }), true);
  assert.equal(shouldUseLiteMode({ deviceMemory: 4, hardwareConcurrency: 4 }), false);
});

test('mobile and coarse-pointer layouts drop the heaviest decorative layers', () => {
  const css = read('styles.css');
  const mobilePerformanceBlock = getMobilePerformanceBlock(css);

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
    assert.match(mobilePerformanceBlock, new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]+?display:\\s*none`));
  });
});

test('mobile and coarse-pointer layouts avoid expensive paint effects', () => {
  const css = read('styles.css');
  const mobilePerformanceBlock = getMobilePerformanceBlock(css);

  [
    '.site-loader__signal',
    '.site-loader__signal::after',
    '.site-loader__bar span',
    'body.is-loaded .hero,',
    '.hero__ember-field',
    '.hero__flare',
    '.hero__stage-glow',
    '.hero__poster',
    '.body-diagram__glow',
    '.body-diagram__poster',
    '.body-info__art',
    '.profile-card__art',
    '.reveal'
  ].forEach((selector) => {
    assert.match(mobilePerformanceBlock, new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  });

  [
    /animation:\s*none/,
    /transition:\s*none/,
    /filter:\s*none/,
    /mix-blend-mode:\s*normal/
  ].forEach((pattern) => {
    assert.match(mobilePerformanceBlock, pattern);
  });
});

test('lightweight mode removes the desktop paint effects most likely to stutter', () => {
  const css = read('styles.css');
  const liteStart = css.indexOf('html.is-lite');
  const liteEnd = css.indexOf('@media (prefers-reduced-motion: reduce)');

  assert.notEqual(liteStart, -1, 'expected html.is-lite rules');
  assert.notEqual(liteEnd, -1, 'expected reduced-motion rules after lite rules');

  const liteBlock = css.slice(liteStart, liteEnd);

  [
    '.hero__backdrop::after',
    '.hero__ambient',
    '.section-deco',
    '.body-diagram__blend',
    '.hero__poster',
    '.body-info__art',
    '.profile-card__art'
  ].forEach((selector) => {
    assert.match(liteBlock, new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  });

  [
    /animation:\s*none/,
    /transition:\s*none/,
    /filter:\s*none/,
    /mix-blend-mode:\s*normal/,
    /transform:\s*none/
  ].forEach((pattern) => {
    assert.match(liteBlock, pattern);
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
