import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url));

function pngHasAlpha(buffer) {
  assert.deepEqual([...buffer.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(buffer.toString('ascii', 12, 16), 'IHDR');

  const colorType = buffer[25];

  if (colorType === 4 || colorType === 6) {
    return true;
  }

  let offset = 8;

  while (offset + 8 <= buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);

    if (type === 'tRNS') {
      return true;
    }

    offset += 12 + length;
  }

  return false;
}

test('transparent character cutouts exist for the hero, body map, and profile art', () => {
  [
    'assets/hero-energy-warrior-cutout.png',
    'assets/body-map-energy-warrior-cutout.png',
    'assets/cards-theme-atlas-cutout.png',
    'assets/ambient-banner-constellation-cutout.png'
  ].forEach((asset) => {
    assert.ok(existsSync(new URL(`../${asset}`, import.meta.url)), `${asset} should exist`);
    assert.equal(pngHasAlpha(read(asset)), true, `${asset} should include transparency`);
  });
});

test('styles point the poster and card art layers at the transparent cutouts', () => {
  const css = read('styles.css').toString('utf8');

  [
    'assets/hero-energy-warrior-cutout.png',
    'assets/body-map-energy-warrior-cutout.png',
    'assets/cards-theme-atlas-cutout.png',
    'assets/ambient-banner-constellation-cutout.png'
  ].forEach((token) => {
    assert.match(css, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  });
});

test('styles do not use the opaque constellation banner in blended decor layers', () => {
  const css = read('styles.css').toString('utf8');

  assert.doesNotMatch(css, /assets\/ambient-banner-constellation\.png/);
});
