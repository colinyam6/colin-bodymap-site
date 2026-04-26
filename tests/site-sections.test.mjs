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
    'profile-card',
    'data-tilt-card'
  ].forEach((token) => {
    assert.match(html, new RegExp(escapeRegExp(token)));
  });
});

test('styles define sticky map and tilt-card treatments', () => {
  const css = read('styles.css');

  [
    'assets/body-map-stage.png',
    '.body-map {',
    '.body-map__sticky {',
    '.body-diagram__hotspot.is-active',
    '.profile-card {',
    '.profile-card::before',
    '.profile-card:hover'
  ].forEach((token) => {
    assert.match(css, new RegExp(escapeRegExp(token)));
  });
});
