import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test('index exposes body-map storytelling hooks and tilt cards', () => {
  const html = read('index.html');

  [
    'body-map__sticky',
    'data-body-panel="mind"',
    'data-body-panel="core"',
    'data-body-hotspot="mind"',
    'body-diagram__poster',
    'body-diagram__weapon',
    'profile-card',
    'profile-card__art',
    'data-tilt-card'
  ].forEach((token) => {
    assert.match(html, new RegExp(escapeRegExp(token)));
  });
});

test('styles define sticky map and tilt-card treatments', () => {
  const css = read('styles.css');

  [
    'assets/body-map-energy-warrior.png',
    'assets/cards-blade-library.png',
    '.body-map {',
    '.body-map__sticky {',
    '.body-diagram__poster {',
    '.body-diagram__weapon {',
    '.body-diagram__hotspot.is-active',
    '.profile-card {',
    '.profile-card::before',
    '.profile-card__art {',
    '.profile-card:hover',
    '.body-info::before'
  ].forEach((token) => {
    assert.match(css, new RegExp(escapeRegExp(token)));
  });
});
