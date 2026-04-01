import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test('hero markup includes champion entrance layers', () => {
  const html = read('index.html');

  [
    'data-parallax-root',
    'hero__poster',
    'hero__ring',
    'hero__silhouette',
    'hero__hud hero__hud--left',
    'hero__hud hero__hud--right',
    'Champion Entrance'
  ].forEach((token) => {
    assert.match(html, new RegExp(escapeRegExp(token)));
  });
});

test('hero styles define arena palette and entrance animation hooks', () => {
  const css = read('styles.css');

  [
    '--accent-blue:',
    '--accent-orange:',
    '.hero {',
    '.hero__poster {',
    '.hero__silhouette {',
    '.hero__cta:hover {',
    '@keyframes heroTitleIn',
    '@media (max-width: 720px)'
  ].forEach((token) => {
    assert.match(css, new RegExp(escapeRegExp(token)));
  });
});
