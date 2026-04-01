import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test('index wires the static site shell and required sections', () => {
  const html = read('index.html');

  assert.match(html, /<link rel="stylesheet" href="styles\.css"\s*\/?>/);
  assert.match(html, /<script type="module" src="script\.js"><\/script>/);

  ['hero', 'about', 'subjects', 'book', 'interests', 'games'].forEach((id) => {
    assert.match(html, new RegExp(`<section[^>]+id="${id}"|<header[^>]+id="${id}"`, 'i'));
  });
});

test('index includes Colin profile copy and game inventory', () => {
  const html = read('index.html');

  [
    'Colin',
    '五年级小学生',
    'AI 游戏创作者',
    '数学',
    '信息技术',
    '《猫武士》',
    '打电脑游戏',
    '打乒乓球',
    '打匹克球',
    '研究编程',
    '看化学书',
    '大航海时代四',
    '潜水员戴夫',
    '黑神话：悟空',
    'Pummel Party',
    '艾尔登法环',
    'Enter My Arena'
  ].forEach((token) => {
    assert.match(html, new RegExp(escapeRegExp(token)));
  });
});
