import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clamp,
  getRevealOptions,
  mapPointerToHeroState,
  mapPointerToTiltState
} from '../script.js';

test('mapPointerToHeroState caps hero motion values', () => {
  assert.deepEqual(mapPointerToHeroState({ x: 1.4, y: -1.4 }), {
    rotateX: 6,
    rotateY: 6,
    shiftX: 18,
    shiftY: -18,
    glowX: 78,
    glowY: 22
  });
});

test('mapPointerToTiltState bounds card tilt and highlight positions', () => {
  assert.deepEqual(mapPointerToTiltState({ x: 1.6, y: -1.4 }), {
    rotateX: 8,
    rotateY: 10,
    glowX: 100,
    glowY: 0
  });
});

test('getRevealOptions disables threshold-heavy animation for reduced motion', () => {
  assert.deepEqual(getRevealOptions(true), {
    threshold: 0,
    rootMargin: '0px 0px -6% 0px'
  });

  assert.deepEqual(getRevealOptions(false), {
    threshold: 0.18,
    rootMargin: '0px 0px -12% 0px'
  });
});

test('clamp keeps values inside the configured range', () => {
  assert.equal(clamp(-4, -2, 2), -2);
  assert.equal(clamp(5, -2, 2), 2);
});
