import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test('index exposes the final layout hooks for sections and game panels', () => {
  const html = read('index.html');

  [
    'section class="section section--about"',
    'subject-grid',
    'book-spotlight',
    'interest-grid',
    'game-zone__grid',
    'data-state="cleared"',
    'data-state="party"',
    'data-state="current"'
  ].forEach((token) => {
    assert.match(html, new RegExp(escapeRegExp(token)));
  });
});

test('styles define hover-ready layouts for subjects, interests, and game panels', () => {
  const css = read('styles.css');

  [
    '.subject-grid {',
    '.subject-card:hover {',
    '.book-spotlight::before',
    '.interest-grid {',
    '.interest-chip:hover {',
    '.game-zone__grid {',
    '.game-zone__panel[data-state="current"]'
  ].forEach((token) => {
    assert.match(css, new RegExp(escapeRegExp(token)));
  });
});
