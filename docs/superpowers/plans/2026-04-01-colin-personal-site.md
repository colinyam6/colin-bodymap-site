# Colin Personal Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, responsive, game-tech personal website for Colin with a champion-entrance hero, concise profile sections, and lightweight interactive motion.

**Architecture:** Use a three-file static site (`index.html`, `styles.css`, `script.js`) and keep the visual weight in CSS. Use vanilla JavaScript only for progressive enhancement: staged entrance animation, section reveals, capped hero parallax, and hover activation helpers. Add a tiny Node built-in smoke-test suite so the site has repeatable checks even without a framework.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript ES modules, Node built-in test runner (`node:test`), Git

---

## File Structure

- Create: `.gitignore` — ignore local brainstorm artifacts and `node_modules/`
- Create: `package.json` — declare a minimal test script
- Create: `index.html` — semantic site markup and all user-facing content
- Create: `styles.css` — visual system, layout, animation, responsive rules, reduced-motion handling
- Create: `script.js` — reveal observer, pointer parallax, and activation state helpers
- Create: `tests/site-content.test.mjs` — shell/content smoke tests
- Create: `tests/site-hero.test.mjs` — hero scene and palette checks
- Create: `tests/site-sections.test.mjs` — secondary section layout checks
- Create: `tests/site-motion.test.mjs` — JS helper tests for motion logic
- Create: `tests/site-polish.test.mjs` — reduced-motion, focus, and polish checks

### Task 1: Bootstrap The Static Site Shell

**Files:**
- Create: `.gitignore`
- Create: `package.json`
- Create: `index.html`
- Create: `styles.css`
- Create: `script.js`
- Create: `tests/site-content.test.mjs`

- [ ] **Step 1: Write the failing content smoke test**

```js
// tests/site-content.test.mjs
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/site-content.test.mjs`

Expected: FAIL with `ENOENT` because `index.html` does not exist yet.

- [ ] **Step 3: Write the minimal site shell and tooling**

```gitignore
# .gitignore
.superpowers/
node_modules/
```

```json
{
  "name": "colin-personal-site",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test tests"
  }
}
```

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Colin | Game-Tech Personal Site</title>
    <meta
      name="description"
      content="Colin 的游戏科技风个人网站，展示他的兴趣、喜欢的科目、喜欢的书和游戏成就。"
    />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header class="hero" id="hero">
      <div class="hero__inner">
        <p class="eyebrow">PLAYER 01</p>
        <h1>Colin</h1>
        <p class="hero__meta">五年级小学生 / AI 游戏创作者 / 热爱数学和科技</p>
        <p class="hero__lede">我是 Colin，我喜欢一边玩游戏，一边研究怎样用 AI 做出自己的游戏世界。</p>
        <a class="hero__cta" href="#about">Enter My Arena</a>
      </div>
    </header>

    <main>
      <section id="about">
        <h2>关于我</h2>
        <p>我是一个喜欢游戏、科技、编程和创造的小学生。</p>
      </section>

      <section id="subjects">
        <h2>喜欢的科目</h2>
        <ul>
          <li>数学</li>
          <li>信息技术</li>
        </ul>
      </section>

      <section id="book">
        <h2>喜欢的书</h2>
        <p>《猫武士》</p>
      </section>

      <section id="interests">
        <h2>兴趣爱好</h2>
        <ul>
          <li>打电脑游戏</li>
          <li>打乒乓球</li>
          <li>打匹克球</li>
          <li>研究编程</li>
          <li>看化学书</li>
        </ul>
      </section>

      <section id="games">
        <h2>游戏专区</h2>
        <h3>已通关</h3>
        <ul>
          <li>大航海时代四</li>
          <li>潜水员戴夫</li>
          <li>黑神话：悟空</li>
        </ul>
        <h3>常玩</h3>
        <ul>
          <li>Pummel Party</li>
        </ul>
        <h3>正在玩</h3>
        <ul>
          <li>艾尔登法环</li>
        </ul>
      </section>
    </main>

    <footer>
      <p>Player Colin, building the next level.</p>
    </footer>

    <script type="module" src="script.js"></script>
  </body>
</html>
```

```css
:root {
  color-scheme: dark;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background: #08101c;
  color: #f5f7ff;
  font-family: "Segoe UI", system-ui, sans-serif;
}

section,
header,
footer {
  padding: 4rem 1.25rem;
}

a {
  color: inherit;
}
```

```js
export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('js');
  });
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/site-content.test.mjs`

Expected: PASS for both smoke tests.

- [ ] **Step 5: Commit**

```bash
git add .gitignore package.json index.html styles.css script.js tests/site-content.test.mjs
git commit -m "feat: add static site shell for Colin homepage"
```

### Task 2: Build The Champion Entrance Hero

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Create: `tests/site-hero.test.mjs`

- [ ] **Step 1: Write the failing hero test**

```js
// tests/site-hero.test.mjs
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/site-hero.test.mjs`

Expected: FAIL because the champion-poster layers and hero-specific CSS do not exist yet.

- [ ] **Step 3: Replace the simple hero with the arena poster hero**

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Colin | Game-Tech Personal Site</title>
  <meta
    name="description"
    content="Colin 的游戏科技风个人网站，展示他的兴趣、喜欢的科目、喜欢的书和游戏成就。"
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800&family=Rajdhani:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
  <link rel="stylesheet" href="styles.css" />
</head>
```

```html
<header class="hero" id="hero" data-parallax-root>
  <div class="hero__backdrop" aria-hidden="true">
    <div class="hero__grid"></div>
    <div class="hero__glow hero__glow--blue"></div>
    <div class="hero__glow hero__glow--orange"></div>
    <div class="hero__scanline"></div>
  </div>

  <div class="hero__inner">
    <p class="eyebrow reveal" data-reveal>Champion Entrance</p>
    <h1 class="hero__title reveal" data-reveal>Colin</h1>
    <p class="hero__meta reveal" data-reveal>五年级小学生 / AI 游戏创作者 / 热爱数学和科技</p>
    <p class="hero__lede reveal" data-reveal>我是 Colin，我喜欢一边玩游戏，一边研究怎样用 AI 做出自己的游戏世界。</p>
    <a class="hero__cta reveal" href="#about" data-reveal aria-label="Scroll to About section">Enter My Arena</a>
  </div>

  <div class="hero__poster" aria-hidden="true">
    <div class="hero__ring"></div>
    <div class="hero__silhouette"></div>
    <div class="hero__hud hero__hud--left">
      <span>PLAYER 01</span>
      <span>AI GAME BUILDER</span>
    </div>
    <div class="hero__hud hero__hud--right">
      <span>MATH MODE</span>
      <span>TECH CORE</span>
    </div>
  </div>
</header>
```

```css
:root {
  color-scheme: dark;
  --bg-deep: #050b14;
  --bg-navy: #0b1730;
  --surface: rgba(8, 16, 30, 0.78);
  --line: rgba(146, 194, 255, 0.18);
  --text-main: #f5f7ff;
  --text-soft: rgba(227, 235, 255, 0.8);
  --accent-blue: #53b8ff;
  --accent-orange: #ff9644;
  --shadow-heavy: 0 24px 80px rgba(0, 0, 0, 0.45);
  --pointer-rotate-x: 0;
  --pointer-rotate-y: 0;
  --pointer-shift-x: 0;
  --pointer-shift-y: 0;
  --pointer-glow-x: 50%;
  --pointer-glow-y: 18%;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(83, 184, 255, 0.12), transparent 32%),
    linear-gradient(180deg, #050b14 0%, #09111d 100%);
  color: var(--text-main);
  font-family: "Rajdhani", "Segoe UI", system-ui, sans-serif;
  overflow-x: hidden;
}

.hero {
  position: relative;
  min-height: 100svh;
  padding: 0;
  display: grid;
  grid-template-columns: minmax(0, 560px) minmax(320px, 1fr);
  align-items: center;
  isolation: isolate;
}

.hero__backdrop,
.hero__poster {
  position: absolute;
  inset: 0;
}

.hero__backdrop {
  background:
    radial-gradient(circle at var(--pointer-glow-x) var(--pointer-glow-y), rgba(255, 184, 95, 0.24), transparent 18%),
    radial-gradient(circle at 18% 22%, rgba(83, 184, 255, 0.18), transparent 20%),
    linear-gradient(160deg, #0d0d19 0%, #0a1327 45%, #050b14 100%);
}

.hero__grid {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, transparent 0 49%, rgba(101, 175, 255, 0.09) 50%, transparent 51%),
    linear-gradient(transparent 0 49%, rgba(101, 175, 255, 0.08) 50%, transparent 51%);
  background-size: 72px 72px;
  opacity: 0.42;
  transform: perspective(760px) rotateX(72deg) translateY(30%);
  transform-origin: center bottom;
}

.hero__glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(24px);
}

.hero__glow--blue {
  width: 26rem;
  height: 26rem;
  left: -2rem;
  top: 10%;
  background: rgba(83, 184, 255, 0.18);
}

.hero__glow--orange {
  width: 22rem;
  height: 22rem;
  right: 8%;
  top: 8%;
  background: rgba(255, 150, 68, 0.18);
}

.hero__scanline {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.04), transparent);
  opacity: 0.6;
  mix-blend-mode: screen;
}

.hero__inner {
  position: relative;
  z-index: 2;
  padding: 6rem 1.5rem 5rem clamp(1.5rem, 4vw, 5rem);
}

.eyebrow {
  margin: 0 0 1rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent-blue);
  font-weight: 700;
}

.hero__title {
  margin: 0;
  font-family: "Orbitron", sans-serif;
  font-size: clamp(4rem, 11vw, 7.5rem);
  line-height: 0.9;
  text-transform: uppercase;
  text-shadow: 0 0 24px rgba(83, 184, 255, 0.35);
  animation: heroTitleIn 800ms ease both;
}

.hero__meta,
.hero__lede {
  max-width: 34rem;
  color: var(--text-soft);
}

.hero__meta {
  margin: 1.25rem 0 0;
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  font-weight: 600;
}

.hero__lede {
  margin: 1rem 0 0;
  font-size: 1.05rem;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.75rem;
  padding: 0.95rem 1.35rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(83, 184, 255, 0.18), rgba(255, 150, 68, 0.24));
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.24);
  text-decoration: none;
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.hero__cta:hover {
  transform: translateY(-2px) scale(1.03);
  border-color: rgba(255, 255, 255, 0.28);
  box-shadow: 0 0 0 1px rgba(83, 184, 255, 0.18), 0 0 28px rgba(255, 150, 68, 0.24);
}

.hero__poster {
  position: relative;
  z-index: 1;
  transform:
    translate3d(calc(var(--pointer-shift-x) * 1px), calc(var(--pointer-shift-y) * 1px), 0)
    rotateX(calc(var(--pointer-rotate-x) * 1deg))
    rotateY(calc(var(--pointer-rotate-y) * 1deg));
  transform-style: preserve-3d;
}

.hero__ring {
  position: absolute;
  inset: 18% 16% 12%;
  border-top: 2px solid rgba(255, 177, 97, 0.82);
  border-bottom: 2px solid rgba(83, 184, 255, 0.34);
  border-radius: 999px / 280px;
  box-shadow: 0 0 28px rgba(255, 150, 68, 0.16);
}

.hero__silhouette {
  position: absolute;
  left: 50%;
  bottom: 10%;
  width: min(26vw, 220px);
  aspect-ratio: 0.66;
  transform: translateX(-50%);
  background:
    radial-gradient(circle at 50% 18%, rgba(255, 255, 255, 0.18), transparent 10%),
    linear-gradient(180deg, rgba(10, 14, 28, 0.12), rgba(3, 4, 9, 0.96));
  clip-path: polygon(50% 0%, 72% 8%, 84% 24%, 88% 44%, 100% 100%, 0% 100%, 12% 44%, 16% 24%, 28% 8%);
  box-shadow: 0 0 24px rgba(255, 150, 68, 0.28);
}

.hero__hud {
  position: absolute;
  display: grid;
  gap: 0.3rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--line);
  background: rgba(5, 11, 20, 0.48);
  backdrop-filter: blur(10px);
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-soft);
}

.hero__hud--left {
  left: 12%;
  bottom: 18%;
}

.hero__hud--right {
  right: 10%;
  top: 24%;
}

.reveal {
  opacity: 0;
  transform: translateY(18px);
}

@keyframes heroTitleIn {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 720px) {
  .hero {
    grid-template-columns: 1fr;
    min-height: auto;
    padding-top: 4rem;
  }

  .hero__inner {
    padding: 1.5rem 1.25rem 22rem;
  }

  .hero__poster {
    min-height: 24rem;
  }

  .hero__hud--left,
  .hero__hud--right {
    font-size: 0.7rem;
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/site-hero.test.mjs`

Expected: PASS for both hero tests.

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css tests/site-hero.test.mjs
git commit -m "feat: add champion entrance hero scene"
```

### Task 3: Build The Secondary Sections And Game Zone

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Create: `tests/site-sections.test.mjs`

- [ ] **Step 1: Write the failing secondary-section test**

```js
// tests/site-sections.test.mjs
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/site-sections.test.mjs`

Expected: FAIL because the detailed section layout classes and selectors are not in place yet.

- [ ] **Step 3: Expand the body sections into the final content layout**

```html
<main class="site-main">
  <section class="section section--about reveal" id="about" data-reveal>
    <p class="section-kicker">About Me</p>
    <div class="about-copy">
      <h2 class="section-heading">我是 Colin，一个喜欢游戏、科技、编程和创造的小学生。</h2>
      <p>
        我最喜欢一边玩游戏，一边研究怎样用 AI 做游戏。我也很喜欢数学、信息技术，还有各种让我越看越想继续探索的科学知识。
      </p>
    </div>
  </section>

  <section class="section reveal" id="subjects" data-reveal>
    <div class="section-head">
      <p class="section-kicker">Favorite Subjects</p>
      <h2 class="section-heading">我最喜欢的科目</h2>
    </div>
    <div class="subject-grid">
      <article class="subject-card">
        <span class="subject-card__label">Skill 01</span>
        <h3>数学</h3>
        <p>我喜欢数字、规律，还有解开题目时像升级一样的感觉。</p>
      </article>
      <article class="subject-card">
        <span class="subject-card__label">Skill 02</span>
        <h3>信息技术</h3>
        <p>我喜欢研究电脑、程序和 AI，想把它们变成我自己的游戏工具。</p>
      </article>
    </div>
  </section>

  <section class="section reveal" id="book" data-reveal>
    <div class="book-spotlight">
      <p class="section-kicker">Favorite Book</p>
      <h2 class="section-heading">《猫武士》</h2>
      <p>我喜欢它勇敢、冒险、充满队伍感的世界，读起来很像进入另一场精彩的任务。</p>
    </div>
  </section>

  <section class="section reveal" id="interests" data-reveal>
    <div class="section-head">
      <p class="section-kicker">Interests</p>
      <h2 class="section-heading">我的兴趣爱好</h2>
    </div>
    <ul class="interest-grid">
      <li class="interest-chip">打电脑游戏</li>
      <li class="interest-chip">打乒乓球</li>
      <li class="interest-chip">打匹克球</li>
      <li class="interest-chip">研究编程</li>
      <li class="interest-chip">看化学书</li>
    </ul>
  </section>

  <section class="section reveal" id="games" data-reveal>
    <div class="section-head">
      <p class="section-kicker">Game Zone</p>
      <h2 class="section-heading">玩家档案</h2>
    </div>
    <div class="game-zone__grid">
      <article class="game-zone__panel" data-state="cleared">
        <div class="game-zone__header">
          <h3>已通关</h3>
          <span class="status-tag">Achievement Unlocked</span>
        </div>
        <div class="status-track"><span class="status-fill" style="--fill: 100%"></span></div>
        <ul class="game-list">
          <li>大航海时代四</li>
          <li>潜水员戴夫</li>
          <li>黑神话：悟空</li>
        </ul>
      </article>

      <article class="game-zone__panel" data-state="party">
        <div class="game-zone__header">
          <h3>常玩</h3>
          <span class="status-tag">Squad Ready</span>
        </div>
        <div class="status-track"><span class="status-fill" style="--fill: 72%"></span></div>
        <ul class="game-list">
          <li>Pummel Party</li>
        </ul>
      </article>

      <article class="game-zone__panel" data-state="current">
        <div class="game-zone__header">
          <h3>正在玩</h3>
          <span class="status-tag">Current Quest</span>
        </div>
        <div class="status-track"><span class="status-fill" style="--fill: 84%"></span></div>
        <ul class="game-list">
          <li>艾尔登法环</li>
        </ul>
      </article>
    </div>
  </section>
</main>

<footer class="site-footer">
  <p>Player Colin, building the next level with games, math, and AI.</p>
</footer>
```

```css
.site-main {
  position: relative;
  z-index: 2;
}

.section {
  padding: 5rem clamp(1.25rem, 4vw, 4rem);
}

.section-kicker {
  margin: 0 0 0.75rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent-blue);
  font-weight: 700;
}

.section-heading {
  margin: 0;
  font-family: "Orbitron", sans-serif;
  font-size: clamp(1.8rem, 4vw, 3.1rem);
  line-height: 1.08;
}

.section-head,
.about-copy {
  max-width: 46rem;
}

.about-copy p,
.subject-card p,
.book-spotlight p,
.game-list,
.site-footer p {
  color: var(--text-soft);
  font-size: 1.02rem;
}

.subject-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.subject-card {
  position: relative;
  padding: 1.5rem;
  border: 1px solid var(--line);
  background: linear-gradient(180deg, rgba(10, 18, 32, 0.92), rgba(8, 12, 22, 0.96));
  box-shadow: var(--shadow-heavy);
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.subject-card:hover {
  transform: translateY(-6px) rotateX(2deg);
  border-color: rgba(83, 184, 255, 0.4);
  box-shadow: 0 0 0 1px rgba(83, 184, 255, 0.18), var(--shadow-heavy);
}

.subject-card__label {
  display: inline-block;
  margin-bottom: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 150, 68, 0.86);
}

.book-spotlight {
  position: relative;
  overflow: hidden;
  padding: clamp(1.5rem, 3vw, 2.75rem);
  border: 1px solid rgba(255, 150, 68, 0.24);
  background: linear-gradient(135deg, rgba(14, 18, 35, 0.96), rgba(8, 12, 20, 1));
}

.book-spotlight::before {
  content: "";
  position: absolute;
  inset: auto -10% -30% auto;
  width: 18rem;
  height: 18rem;
  border-radius: 999px;
  background: rgba(255, 150, 68, 0.16);
  filter: blur(18px);
}

.interest-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.85rem;
  padding: 0;
  margin: 1.5rem 0 0;
  list-style: none;
}

.interest-chip {
  padding: 1rem 1.1rem;
  border: 1px solid var(--line);
  background: rgba(7, 14, 26, 0.86);
  text-align: center;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}

.interest-chip:hover {
  transform: translateY(-4px) skewX(-2deg);
  border-color: rgba(255, 255, 255, 0.22);
  background: linear-gradient(90deg, rgba(83, 184, 255, 0.12), rgba(255, 150, 68, 0.12));
}

.game-zone__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.game-zone__panel {
  padding: 1.5rem;
  border: 1px solid var(--line);
  background: linear-gradient(180deg, rgba(8, 14, 24, 0.95), rgba(5, 10, 18, 0.98));
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.game-zone__panel[data-state="current"] {
  border-color: rgba(255, 150, 68, 0.28);
  box-shadow: 0 0 0 1px rgba(255, 150, 68, 0.1), var(--shadow-heavy);
}

.game-zone__panel:hover {
  transform: translateY(-6px);
  border-color: rgba(83, 184, 255, 0.42);
}

.game-zone__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.75rem;
}

.status-tag {
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.82rem;
}

.status-track {
  height: 8px;
  margin: 1rem 0 1.1rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.status-fill {
  display: block;
  height: 100%;
  width: var(--fill, 0%);
  background: linear-gradient(90deg, var(--accent-blue), var(--accent-orange));
}

.game-list {
  margin: 0;
  padding-left: 1.2rem;
}

.game-list li + li {
  margin-top: 0.5rem;
}

.site-footer {
  padding: 2rem 1.25rem 3rem;
  text-align: center;
}

@media (max-width: 900px) {
  .subject-grid,
  .game-zone__grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/site-sections.test.mjs`

Expected: PASS for both secondary-section tests.

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css tests/site-sections.test.mjs
git commit -m "feat: add Colin profile sections and game zone"
```

### Task 4: Implement Motion Helpers And Progressive Enhancement

**Files:**
- Modify: `script.js`
- Create: `tests/site-motion.test.mjs`

- [ ] **Step 1: Write the failing motion test**

```js
// tests/site-motion.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { clamp, mapPointerToHeroState, getRevealOptions } from '../script.js';

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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/site-motion.test.mjs`

Expected: FAIL because `mapPointerToHeroState` and `getRevealOptions` are not exported yet.

- [ ] **Step 3: Implement the motion helpers and browser wiring**

```js
export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const mapPointerToHeroState = ({ x, y }) => {
  const safeX = clamp(x, -1, 1);
  const safeY = clamp(y, -1, 1);

  return {
    rotateX: Number((safeY * -6).toFixed(2)),
    rotateY: Number((safeX * 6).toFixed(2)),
    shiftX: Number((safeX * 18).toFixed(2)),
    shiftY: Number((safeY * 18).toFixed(2)),
    glowX: Number((50 + safeX * 28).toFixed(2)),
    glowY: Number((50 + safeY * 28).toFixed(2))
  };
};

export const getRevealOptions = (reducedMotion) => ({
  threshold: reducedMotion ? 0 : 0.18,
  rootMargin: reducedMotion ? '0px 0px -6% 0px' : '0px 0px -12% 0px'
});

const setVisible = (elements) => {
  elements.forEach((element) => element.classList.add('is-visible'));
};

export function initSite(doc = document, win = window) {
  const reducedMotion = win.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = [...doc.querySelectorAll('[data-reveal]')];
  const hero = doc.querySelector('[data-parallax-root]');
  const cta = doc.querySelector('.hero__cta');

  doc.documentElement.classList.add('js', 'is-ready');
  doc.documentElement.classList.toggle('reduce-motion', reducedMotion);

  if (reducedMotion || !('IntersectionObserver' in win)) {
    setVisible(revealItems);
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, getRevealOptions(false));

    revealItems.forEach((item) => observer.observe(item));
  }

  if (hero && !reducedMotion) {
    hero.addEventListener('pointermove', (event) => {
      const bounds = hero.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
      const state = mapPointerToHeroState({ x, y });

      hero.style.setProperty('--pointer-rotate-x', `${state.rotateX}`);
      hero.style.setProperty('--pointer-rotate-y', `${state.rotateY}`);
      hero.style.setProperty('--pointer-shift-x', `${state.shiftX}`);
      hero.style.setProperty('--pointer-shift-y', `${state.shiftY}`);
      hero.style.setProperty('--pointer-glow-x', `${state.glowX}%`);
      hero.style.setProperty('--pointer-glow-y', `${state.glowY}%`);
    });

    hero.addEventListener('pointerleave', () => {
      ['--pointer-rotate-x', '--pointer-rotate-y', '--pointer-shift-x', '--pointer-shift-y'].forEach((token) => {
        hero.style.setProperty(token, '0');
      });
      hero.style.setProperty('--pointer-glow-x', '50%');
      hero.style.setProperty('--pointer-glow-y', '50%');
    });
  }

  if (cta) {
    cta.addEventListener('pointerenter', () => hero?.classList.add('is-energized'));
    cta.addEventListener('pointerleave', () => hero?.classList.remove('is-energized'));
  }
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    initSite();
  });
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/site-motion.test.mjs`

Expected: PASS for all three motion tests.

- [ ] **Step 5: Commit**

```bash
git add script.js tests/site-motion.test.mjs
git commit -m "feat: add reveal and hero motion helpers"
```

### Task 5: Add Accessibility And Motion Polish

**Files:**
- Modify: `styles.css`
- Create: `tests/site-polish.test.mjs`

- [ ] **Step 1: Write the failing polish test**

```js
// tests/site-polish.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test('styles include focus, reveal, energized, and reduced-motion polish', () => {
  const css = read('styles.css');

  [
    '.reveal.is-visible',
    '.hero.is-energized .hero__cta',
    '.hero__cta:focus-visible',
    '.game-zone__panel:hover .status-fill',
    '@media (prefers-reduced-motion: reduce)'
  ].forEach((token) => {
    assert.match(css, new RegExp(escapeRegExp(token)));
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/site-polish.test.mjs`

Expected: FAIL because those polish selectors and the reduced-motion block are missing.

- [ ] **Step 3: Add final CSS polish for reveals, hover energy, focus, and reduced motion**

```css
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 480ms ease, transform 480ms ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.hero.is-energized .hero__cta {
  box-shadow: 0 0 0 1px rgba(83, 184, 255, 0.2), 0 0 34px rgba(255, 150, 68, 0.34);
}

.hero__cta:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.9);
  outline-offset: 4px;
}

.game-zone__panel:hover .status-fill {
  filter: brightness(1.15);
  transform: scaleX(1.02);
  transform-origin: left center;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }

  .reveal,
  .reveal.is-visible {
    opacity: 1;
    transform: none;
  }

  .hero__poster,
  .subject-card:hover,
  .interest-chip:hover,
  .game-zone__panel:hover {
    transform: none;
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/site-polish.test.mjs`

Expected: PASS for the polish test.

- [ ] **Step 5: Commit**

```bash
git add styles.css tests/site-polish.test.mjs
git commit -m "feat: add motion polish and accessibility fallbacks"
```

### Task 6: Verify The Finished Site End-To-End

**Files:**
- Verify: `index.html`
- Verify: `styles.css`
- Verify: `script.js`
- Verify: `tests/site-content.test.mjs`
- Verify: `tests/site-hero.test.mjs`
- Verify: `tests/site-sections.test.mjs`
- Verify: `tests/site-motion.test.mjs`
- Verify: `tests/site-polish.test.mjs`

- [ ] **Step 1: Run the full automated test suite**

Run: `npm test`

Expected: PASS across all five test files.

- [ ] **Step 2: Start a local preview server**

Run: `py -m http.server 4173`

Expected: `Serving HTTP on :: port 4173` or `Serving HTTP on 0.0.0.0 port 4173`.

- [ ] **Step 3: Manually verify the desktop and mobile experience**

Check these points in the browser at `http://localhost:4173/`:

- Hero fills the first screen and feels like a champion entrance poster
- `Colin` is the loudest text and remains readable over the glows
- About, subjects, book, interests, and game zone reveal smoothly when scrolling
- Buttons, subject cards, interest chips, and game panels all show glow/lift feedback on hover
- Mobile width stacks the hero cleanly and keeps the CTA tappable
- With reduced motion enabled in the OS/browser, transforms stop and content still appears cleanly

- [ ] **Step 4: Create the final implementation commit**

```bash
git add index.html styles.css script.js package.json .gitignore tests
git commit -m "feat: launch Colin game-tech personal website"
```
