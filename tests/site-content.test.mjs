import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test('index wires the body-map site shell and required sections', () => {
  const html = read('index.html');

  assert.match(html, /<link rel="stylesheet" href="styles\.css"\s*\/?>/);
  assert.match(html, /<script src="script\.js"><\/script>/);
  assert.doesNotMatch(html, /<script type="module" src="script\.js"><\/script>/);

  ['hero', 'body-map', 'profile-cards', 'closing'].forEach((id) => {
    assert.match(html, new RegExp(`<section[^>]+id="${id}"|<header[^>]+id="${id}"`, 'i'));
  });
});

test('index includes Colin profile copy and updated interest inventory', () => {
  const html = read('index.html');

  [
    'Colin',
    '五年级小学生',
    '数学',
    '英语',
    '篮球',
    '足球',
    '钢琴',
    '猫武士',
    '进击的学霸',
    '大航海时代四',
    '潜水员戴夫',
    '黑神话：悟空',
    'Pummel Party',
    '艾尔登法环'
  ].forEach((token) => {
    assert.match(html, new RegExp(escapeRegExp(token)));
  });
});
