import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('mobile layout stacks the hero, body map, and cards', () => {
  const css = read('styles.css');

  [
    '@media (max-width: 860px)',
    '.hero {',
    '.body-map {',
    '.body-map__sticky {',
    '.profile-grid {'
  ].forEach((token) => {
    assert.match(css, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  });
});
