import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test('index exposes body-map storytelling hooks and tilt cards', () => {
  const html = read('index.html');

  [
    'body-map__sticky',
    'body-info--mind',
    'body-info--squad',
    'data-body-panel="mind"',
    'data-body-panel="core"',
    'data-body-hotspot="mind"',
    'body-diagram__poster',
    'body-diagram__blend',
    'profile-card',
    'profile-card--mind',
    'profile-card--game',
    'profile-card__art',
    'section-deco',
    'section-deco--map-top',
    'section-deco--map-bottom',
    'section-deco--cards-middle',
    'section-deco--cards-band',
    'section-deco--closing-left',
    'section-deco--closing-center',
    'data-tilt-card'
  ].forEach((token) => {
    assert.match(html, new RegExp(escapeRegExp(token)));
  });

  [
    'body-diagram__weapon'
  ].forEach((token) => {
    assert.doesNotMatch(html, new RegExp(escapeRegExp(token)));
  });
});

test('styles define sticky map and tilt-card treatments', () => {
  const css = read('styles.css');

  [
    'assets/body-map-energy-warrior-cutout.png',
    'assets/cards-theme-atlas-cutout.png',
    'assets/ambient-soft-motifs.png',
    'assets/ambient-banner-emberflow.png',
    'assets/ambient-vertical-plume.png',
    '.body-map {',
    '.body-map__sticky {',
    '.body-diagram__poster {',
    '.body-diagram__poster::before {',
    '.body-diagram__blend {',
    '.body-diagram__hotspot.is-active',
    '.body-info--mind .body-info__art {',
    '.body-info--game .body-info__art {',
    '.profile-card {',
    '.profile-card::before',
    '.profile-card--mind .profile-card__art {',
    '.profile-card--squad .profile-card__art {',
    '.section-deco {',
    '.section-deco--map-top {',
    '.section-deco--map-bottom {',
    '.section-deco--cards-middle {',
    '.section-deco--cards-band {',
    '.section-deco--closing-left {',
    '.section-deco--closing-center {',
    '.profile-card:hover',
    '.section-deco--hero-left {'
  ].forEach((token) => {
    assert.match(css, new RegExp(escapeRegExp(token)));
  });

  [
    '.body-info::before',
    '.profile-card::after',
    '.profile-card__art::before',
    '.body-diagram__weapon {',
    'assets/ambient-inserts.png'
  ].forEach((token) => {
    assert.doesNotMatch(css, new RegExp(escapeRegExp(token)));
  });
});
