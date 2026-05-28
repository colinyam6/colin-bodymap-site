import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('home page exposes a Flappy Bird game entry point', () => {
  const html = read('index.html');

  assert.match(html, /id="games"/);
  assert.match(html, /href="games\/flappy-bird\/"/);
  assert.match(html, /data-game-link="flappy-bird"/);
  assert.match(html, /Flappy Bird/);
});

test('Flappy Bird route is bundled with its runtime assets', () => {
  const html = read('games/flappy-bird/index.html');
  const route = new URL('../games/flappy-bird/', import.meta.url);

  assert.match(html, /<canvas id="game"/);
  assert.match(html, /RangerRescueRules/);
  assert.match(html, /assets\/jump\.wav/);

  const assets = [
    ...new Set([...html.matchAll(/assets\/[A-Za-z0-9_./-]+/g)].map((match) => match[0]))
  ];

  assert.ok(assets.length >= 40, 'expected the game to declare its image and audio assets');

  assets.forEach((asset) => {
    assert.ok(existsSync(new URL(asset, route)), `${asset} should be copied into the game route`);
  });
});
