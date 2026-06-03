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

test('Flappy Bird widens the pipe gap and keeps the canvas recoverable', () => {
  const html = read('games/flappy-bird/index.html');
  const pipeGap = Number(html.match(/pipeGap:\s*(\d+)/)?.[1] || 0);

  assert.ok(pipeGap >= 188, `expected pipe gap to be at least 188, got ${pipeGap}`);
  assert.match(html, /MAX_CANVAS_PIXELS/);
  assert.match(html, /handleGameError/);
  assert.match(html, /renderFallbackNotice/);
  assert.match(html, /safeRender/);
  assert.match(html, /canvas\.addEventListener\('mousedown'/);
  assert.match(html, /canvas\.addEventListener\('touchstart'/);
});

test('Flappy Bird narrows the pipe gap gradually with a safe lower bound', () => {
  const html = read('games/flappy-bird/index.html');

  assert.match(html, /basePipeGap:\s*208/);
  assert.match(html, /minPipeGap:\s*166/);
  assert.match(html, /pipeGapStep:\s*6/);
  assert.match(html, /pipeGapEveryScore:\s*5/);
  assert.match(html, /function getCurrentPipeGap\(\)/);
  assert.match(html, /Math\.floor\(state\.score\s*\/\s*settings\.pipeGapEveryScore\)/);
  assert.match(html, /Math\.max\(settings\.minPipeGap/);
});

test('Flappy Bird keeps animating when one render layer fails', () => {
  const html = read('games/flappy-bird/index.html');

  assert.match(html, /function drawLayerSafely\(label,\s*draw\)/);
  assert.match(html, /drawLayerSafely\('background'/);
  assert.match(html, /drawLayerSafely\('obstacles'/);
  assert.match(html, /drawLayerSafely\('ranger'/);
  assert.match(html, /function drawImageSafely\(label,\s*image,/);
  assert.match(html, /state\.renderWarnings/);
  assert.doesNotMatch(html, /state\.renderFailed\s*=\s*true;/);
});
