import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');

test('mobile hero keeps poster closer to the content block', () => {
  [
    'padding: 1.5rem 1.25rem 15rem;',
    'min-height: 18rem;',
    'width: min(42vw, 180px);',
    'bottom: 14%;'
  ].forEach((token) => {
    assert.match(css, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  });
});
