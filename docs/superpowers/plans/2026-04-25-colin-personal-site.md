# Colin Personal Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fiery one-page personal website for Colin with a central body-map hero, scroll-activated anatomy storytelling, and hover-tilt detail cards.

**Architecture:** Keep the site as a static three-file front end (`index.html`, `styles.css`, `script.js`) with most of the visual weight in CSS and small progressive-enhancement helpers in JavaScript. Use Node built-in tests to lock markup hooks, motion math, and responsive selectors before implementation.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript ES modules, Node built-in test runner (`node:test`), Git

---

## File Structure

- Modify: `index.html` - replace the old game-tech layout with the fire-first body-map page structure
- Modify: `styles.css` - replace the cool-blue arena styling with the new warm visual system and responsive layout
- Modify: `script.js` - keep reveal support, add body-map activation and tilt-card math
- Modify: `tests/site-content.test.mjs` - assert the new section structure and copy
- Modify: `tests/site-hero.test.mjs` - assert the new hero/body-stage selectors and warm palette
- Modify: `tests/site-sections.test.mjs` - assert sticky body-map and tilt-card hooks
- Modify: `tests/site-mobile-layout.test.mjs` - assert mobile stacking rules for the new layout
- Modify: `tests/site-motion.test.mjs` - assert hero and card tilt math helpers
- Modify: `tests/site-polish.test.mjs` - assert focus, active-state, and reduced-motion selectors

### Task 1: Lock The New Structure With Failing Tests

**Files:**
- Modify: `tests/site-content.test.mjs`
- Modify: `tests/site-hero.test.mjs`
- Modify: `tests/site-sections.test.mjs`
- Modify: `tests/site-mobile-layout.test.mjs`
- Modify: `tests/site-motion.test.mjs`
- Modify: `tests/site-polish.test.mjs`

- [ ] **Step 1: Rewrite the content smoke test to describe the new site**

```js
test('index wires the body-map site shell and required sections', () => {
  const html = read('index.html');

  assert.match(html, /<link rel="stylesheet" href="styles\.css"\s*\/?>/);
  assert.match(html, /<script type="module" src="script\.js"><\/script>/);

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
```

- [ ] **Step 2: Rewrite the hero, sections, mobile, motion, and polish tests**

```js
// tests/site-hero.test.mjs
test('hero markup includes the fiery body-stage layers', () => {
  const html = read('index.html');

  [
    'data-parallax-root',
    'hero__body-stage',
    'hero__body',
    'hero__heat-ring',
    'hero__flare',
    'Heat Mode Online'
  ].forEach((token) => {
    assert.match(html, new RegExp(escapeRegExp(token)));
  });
});

test('hero styles define the warm palette and body-stage hooks', () => {
  const css = read('styles.css');

  [
    '--accent-fire:',
    '--accent-gold:',
    '.hero {',
    '.hero__body-stage {',
    '.hero__heat-ring {',
    '.hero__body::before',
    '@keyframes heatPulse'
  ].forEach((token) => {
    assert.match(css, new RegExp(escapeRegExp(token)));
  });
});
```

```js
// tests/site-sections.test.mjs
test('index exposes body-map storytelling hooks and tilt cards', () => {
  const html = read('index.html');

  [
    'body-map__sticky',
    'data-body-panel="mind"',
    'data-body-panel="core"',
    'data-body-hotspot="mind"',
    'profile-card',
    'data-tilt-card'
  ].forEach((token) => {
    assert.match(html, new RegExp(escapeRegExp(token)));
  });
});

test('styles define sticky map and tilt-card treatments', () => {
  const css = read('styles.css');

  [
    '.body-map {',
    '.body-map__sticky {',
    '.body-diagram__hotspot.is-active',
    '.profile-card {',
    '.profile-card::before',
    '.profile-card:hover'
  ].forEach((token) => {
    assert.match(css, new RegExp(escapeRegExp(token)));
  });
});
```

```js
// tests/site-mobile-layout.test.mjs
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
```

```js
// tests/site-motion.test.mjs
import { clamp, mapPointerToHeroState, mapPointerToTiltState, getRevealOptions } from '../script.js';

test('mapPointerToTiltState bounds card tilt and highlight positions', () => {
  assert.deepEqual(mapPointerToTiltState({ x: 1.6, y: -1.4 }), {
    rotateX: 8,
    rotateY: 10,
    glowX: 100,
    glowY: 0
  });
});
```

```js
// tests/site-polish.test.mjs
test('styles include active map, focus, tilt, and reduced-motion polish', () => {
  const css = read('styles.css');

  [
    '.body-info.is-active',
    '.body-diagram__hotspot.is-active',
    '.profile-card.is-tilting',
    '.hero__cta:focus-visible',
    '@media (prefers-reduced-motion: reduce)'
  ].forEach((token) => {
    assert.match(css, new RegExp(escapeRegExp(token)));
  });
});
```

- [ ] **Step 3: Run the full test suite to confirm the new tests fail**

Run: `npm test`

Expected: FAIL because the current implementation still renders the old champion-arena site and does not include the new body-map selectors, content, or motion helper.

- [ ] **Step 4: Commit the failing tests**

```bash
git add tests/site-content.test.mjs tests/site-hero.test.mjs tests/site-sections.test.mjs tests/site-mobile-layout.test.mjs tests/site-motion.test.mjs tests/site-polish.test.mjs
git commit -m "test: define body-map personal site requirements"
```

### Task 2: Rebuild The Hero And Body-Map Story Layout

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

- [ ] **Step 1: Replace the old hero markup with the fiery poster hero**

```html
<header class="hero" id="hero" data-parallax-root>
  <div class="hero__backdrop" aria-hidden="true">
    <div class="hero__ember-field"></div>
    <div class="hero__flare hero__flare--left"></div>
    <div class="hero__flare hero__flare--right"></div>
    <div class="hero__scan"></div>
  </div>

  <div class="hero__copy">
    <p class="hero__eyebrow reveal" data-reveal>Heat Mode Online</p>
    <h1 class="hero__title reveal" data-reveal>Colin</h1>
    <p class="hero__meta reveal" data-reveal>五年级小学生 / 数学英语强 / 超爱游戏</p>
    <p class="hero__lede reveal" data-reveal>这是一张我的热血身体信息地图，往下滑就能解锁我的学习力、运动感和游戏能量核心。</p>
    <a class="hero__cta reveal" href="#body-map" data-reveal>下滑解锁</a>
  </div>

  <div class="hero__body-stage" aria-hidden="true">
    <div class="hero__heat-ring"></div>
    <div class="hero__heat-ring hero__heat-ring--inner"></div>
    <div class="hero__body"></div>
    <div class="hero__tag hero__tag--mind">MATH / ENGLISH</div>
    <div class="hero__tag hero__tag--core">GAME CORE</div>
  </div>
</header>
```

- [ ] **Step 2: Add the sticky body-map storytelling section**

```html
<section class="section section--map" id="body-map">
  <div class="body-map">
    <div class="body-map__sticky">
      <div class="body-diagram" data-body-diagram>
        <div class="body-diagram__figure"></div>
        <button class="body-diagram__hotspot is-active" data-body-hotspot="mind" type="button">头部</button>
        <button class="body-diagram__hotspot" data-body-hotspot="heart" type="button">胸口</button>
        <button class="body-diagram__hotspot" data-body-hotspot="hands" type="button">手部</button>
        <button class="body-diagram__hotspot" data-body-hotspot="legs" type="button">腿部</button>
        <button class="body-diagram__hotspot" data-body-hotspot="core" type="button">核心</button>
        <button class="body-diagram__hotspot" data-body-hotspot="squad" type="button">同伴</button>
      </div>
    </div>

    <div class="body-map__story">
      <article class="body-info is-active" data-body-panel="mind" data-reveal>
        <p class="section-kicker">Head</p>
        <h2>学习脑力很强</h2>
        <p>我是五年级小学生，学习成绩很好，尤其喜欢数学和英语。</p>
      </article>
      <article class="body-info" data-body-panel="heart" data-reveal>
        <p class="section-kicker">Heart</p>
        <h2>胸口装着很多故事</h2>
        <p>我读过很多书，比如《猫武士》和《进击的学霸》。</p>
      </article>
      <article class="body-info" data-body-panel="hands" data-reveal>
        <p class="section-kicker">Hands</p>
        <h2>会弹钢琴，但不是最爱</h2>
        <p>我会弹钢琴，不过它更像一个会用的技能，不是我最喜欢的事情。</p>
      </article>
      <article class="body-info" data-body-panel="legs" data-reveal>
        <p class="section-kicker">Legs</p>
        <h2>喜欢冲起来</h2>
        <p>我喜欢打篮球和踢足球，虽然不是特别厉害，但运动的时候很开心。</p>
      </article>
      <article class="body-info" data-body-panel="core" data-reveal>
        <p class="section-kicker">Core</p>
        <h2>最强能量来自游戏</h2>
        <p>我最喜欢打游戏，已经通关《大航海时代四》《潜水员戴夫》和《黑神话：悟空》。</p>
      </article>
      <article class="body-info" data-body-panel="squad" data-reveal>
        <p class="section-kicker">Squad</p>
        <h2>和同学一起更好玩</h2>
        <p>我喜欢和同学一起玩 Pummel Party，现在也正在玩《艾尔登法环》。</p>
      </article>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Implement the warm visual system and body-map layout in CSS**

```css
:root {
  --bg-base: #120708;
  --bg-deep: #1b0a09;
  --surface: rgba(34, 14, 12, 0.78);
  --surface-strong: rgba(47, 18, 14, 0.92);
  --text-main: #fff5ea;
  --text-soft: rgba(255, 233, 214, 0.78);
  --accent-fire: #ff6a2a;
  --accent-gold: #ffbe5c;
  --accent-cyan: #79f0ff;
}

.hero {
  min-height: 100svh;
  display: grid;
  grid-template-columns: minmax(0, 560px) minmax(320px, 1fr);
}

.hero__body-stage {
  position: relative;
  min-height: 100%;
}

.hero__heat-ring {
  position: absolute;
  inset: 16% 18%;
  border: 2px solid rgba(255, 190, 92, 0.36);
  border-radius: 50%;
  animation: heatPulse 4.8s ease-in-out infinite;
}

.hero__body {
  position: absolute;
  left: 50%;
  bottom: 10%;
  width: min(24vw, 220px);
  aspect-ratio: 0.6;
  transform: translateX(-50%);
}

.hero__body::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 48% 48% 24% 24% / 20% 20% 10% 10%;
  background: linear-gradient(180deg, rgba(255, 214, 163, 0.24), rgba(255, 96, 35, 0.08));
  box-shadow: 0 0 40px rgba(255, 106, 42, 0.3);
}

.body-map {
  display: grid;
  grid-template-columns: minmax(280px, 0.9fr) minmax(0, 1.1fr);
  gap: 2rem;
}

.body-map__sticky {
  position: sticky;
  top: 4rem;
}

.body-diagram__hotspot.is-active {
  border-color: rgba(255, 190, 92, 0.82);
  box-shadow: 0 0 0 1px rgba(255, 106, 42, 0.36), 0 0 28px rgba(255, 106, 42, 0.22);
}

@keyframes heatPulse {
  0%, 100% { transform: scale(0.98); opacity: 0.65; }
  50% { transform: scale(1.03); opacity: 1; }
}
```

- [ ] **Step 4: Run the focused tests for content, hero, and section hooks**

Run: `node --test tests/site-content.test.mjs tests/site-hero.test.mjs tests/site-sections.test.mjs`

Expected: PASS for hero and structure tests, while motion/polish/mobile tests can still fail until later tasks land.

- [ ] **Step 5: Commit the layout rewrite**

```bash
git add index.html styles.css
git commit -m "feat: add fiery hero and body-map story layout"
```

### Task 3: Build The Tilt-Card Detail Section And Motion Helpers

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `script.js`

- [ ] **Step 1: Add the detail-card and closing markup**

```html
<section class="section section--cards" id="profile-cards">
  <div class="section-head">
    <p class="section-kicker">Profile Cards</p>
    <h2 class="section-heading">下面这些是我的热血档案卡</h2>
  </div>
  <div class="profile-grid">
    <article class="profile-card" data-tilt-card>
      <p class="profile-card__kicker">Learning Core</p>
      <h3>数学和英语最亮</h3>
      <p>我很喜欢解题和学英语，感觉像不断升级。</p>
    </article>
    <article class="profile-card" data-tilt-card>
      <p class="profile-card__kicker">Reading Heart</p>
      <h3>读过很多书</h3>
      <p>《猫武士》《进击的学霸》这些故事都让我想继续往下读。</p>
    </article>
    <article class="profile-card" data-tilt-card>
      <p class="profile-card__kicker">Sports Drive</p>
      <h3>喜欢篮球和足球</h3>
      <p>不是专业选手，但我真的喜欢冲起来的感觉。</p>
    </article>
    <article class="profile-card" data-tilt-card>
      <p class="profile-card__kicker">Piano Skill</p>
      <h3>会弹，但不是最爱</h3>
      <p>它像一个已经点亮的技能，不过不是主线爱好。</p>
    </article>
    <article class="profile-card" data-tilt-card>
      <p class="profile-card__kicker">Game Reactor</p>
      <h3>游戏能量最强</h3>
      <p>最喜欢打游戏，也已经通关了几款很喜欢的作品。</p>
    </article>
    <article class="profile-card" data-tilt-card>
      <p class="profile-card__kicker">Squad Mode</p>
      <h3>和同学玩更开心</h3>
      <p>Pummel Party 很欢乐，而《艾尔登法环》还在继续冒险。</p>
    </article>
  </div>
</section>

<section class="section section--closing" id="closing">
  <p class="section-kicker">Next Level</p>
  <h2 class="section-heading">Colin 还在继续升级中。</h2>
  <p class="closing-copy">学习、运动、阅读、游戏和新的冒险，还会继续点亮更多区域。</p>
</section>
```

- [ ] **Step 2: Add CSS for tilt cards and closing treatment**

```css
.profile-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.profile-card {
  position: relative;
  overflow: hidden;
  padding: 1.35rem;
  border: 1px solid rgba(255, 190, 92, 0.18);
  border-radius: 24px;
  background: linear-gradient(160deg, rgba(48, 16, 13, 0.96), rgba(22, 9, 10, 0.96));
  transform: perspective(960px) rotateX(var(--card-rotate-x, 0deg)) rotateY(var(--card-rotate-y, 0deg));
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.profile-card::before {
  content: "";
  position: absolute;
  inset: -40%;
  background: radial-gradient(circle at var(--card-glow-x, 50%) var(--card-glow-y, 50%), rgba(255, 204, 134, 0.28), transparent 28%);
  opacity: 0.85;
  pointer-events: none;
}

.profile-card:hover,
.profile-card.is-tilting {
  border-color: rgba(255, 190, 92, 0.5);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.28), 0 0 36px rgba(255, 106, 42, 0.12);
}
```

- [ ] **Step 3: Add bounded tilt math and scroll activation logic in `script.js`**

```js
export const mapPointerToTiltState = ({ x, y }) => {
  const safeX = clamp(x, -1, 1);
  const safeY = clamp(y, -1, 1);

  return {
    rotateX: Number((safeY * -8).toFixed(2)),
    rotateY: Number((safeX * 10).toFixed(2)),
    glowX: Number(((safeX + 1) * 50).toFixed(2)),
    glowY: Number(((safeY + 1) * 50).toFixed(2))
  };
};

const syncActiveBodyPanel = (doc, id) => {
  doc.querySelectorAll('[data-body-panel]').forEach((panel) => {
    panel.classList.toggle('is-active', panel.dataset.bodyPanel === id);
  });

  doc.querySelectorAll('[data-body-hotspot]').forEach((spot) => {
    spot.classList.toggle('is-active', spot.dataset.bodyHotspot === id);
  });
};

const initBodyMap = (doc, win, reducedMotion) => {
  const panels = [...doc.querySelectorAll('[data-body-panel]')];
  if (!panels.length || !('IntersectionObserver' in win)) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      .slice(0, 1)
      .forEach((entry) => syncActiveBodyPanel(doc, entry.target.dataset.bodyPanel));
  }, {
    threshold: reducedMotion ? 0.1 : 0.45
  });

  panels.forEach((panel) => observer.observe(panel));
};

const initTiltCards = (doc, reducedMotion) => {
  if (reducedMotion) {
    return;
  }

  doc.querySelectorAll('[data-tilt-card]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      const state = mapPointerToTiltState({ x, y });

      card.classList.add('is-tilting');
      card.style.setProperty('--card-rotate-x', `${state.rotateX}deg`);
      card.style.setProperty('--card-rotate-y', `${state.rotateY}deg`);
      card.style.setProperty('--card-glow-x', `${state.glowX}%`);
      card.style.setProperty('--card-glow-y', `${state.glowY}%`);
    });

    card.addEventListener('pointerleave', () => {
      card.classList.remove('is-tilting');
      card.style.removeProperty('--card-rotate-x');
      card.style.removeProperty('--card-rotate-y');
      card.style.removeProperty('--card-glow-x');
      card.style.removeProperty('--card-glow-y');
    });
  });
};
```

- [ ] **Step 4: Wire the new helpers into `initSite` and run motion tests**

Run: `node --test tests/site-motion.test.mjs tests/site-polish.test.mjs`

Expected: PASS once `mapPointerToTiltState`, active-state classes, and reduced-motion-safe behavior are present.

- [ ] **Step 5: Commit the interaction layer**

```bash
git add index.html styles.css script.js
git commit -m "feat: add tilt cards and body-map interactions"
```

### Task 4: Finish Responsive And Reduced-Motion Polish

**Files:**
- Modify: `styles.css`

- [ ] **Step 1: Add the mobile layout rules**

```css
@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .body-map {
    grid-template-columns: 1fr;
  }

  .body-map__sticky {
    position: relative;
    top: 0;
  }

  .profile-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Add reduced-motion overrides for hero, body map, and cards**

```css
@media (prefers-reduced-motion: reduce) {
  .hero__body-stage,
  .profile-card,
  .profile-card:hover,
  .profile-card.is-tilting,
  .body-diagram__hotspot,
  .body-info {
    transform: none !important;
    animation: none !important;
  }
}
```

- [ ] **Step 3: Run the full automated suite**

Run: `npm test`

Expected: PASS across `tests/site-content.test.mjs`, `tests/site-hero.test.mjs`, `tests/site-sections.test.mjs`, `tests/site-mobile-layout.test.mjs`, `tests/site-motion.test.mjs`, and `tests/site-polish.test.mjs`.

- [ ] **Step 4: Commit the responsive polish**

```bash
git add styles.css tests/site-mobile-layout.test.mjs tests/site-polish.test.mjs
git commit -m "feat: polish responsive and reduced-motion behavior"
```

### Task 5: Verify The Final Frontend

**Files:**
- Verify: `index.html`
- Verify: `styles.css`
- Verify: `script.js`
- Verify: `tests/*.test.mjs`

- [ ] **Step 1: Run the full test suite again**

Run: `npm test`

Expected: PASS with zero failures.

- [ ] **Step 2: Start a local preview server**

Run: `py -m http.server 4173`

Expected: `Serving HTTP on` output for port `4173`.

- [ ] **Step 3: Manually verify in a browser**

Check at `http://localhost:4173/`:

- first screen feels like a fiery hero poster
- body map stays readable while scrolling
- active hotspot follows the visible story block
- cards tilt and glow on hover
- mobile stacks cleanly
- reduced motion removes major transforms

- [ ] **Step 4: Create the final implementation commit**

```bash
git add index.html styles.css script.js tests docs/superpowers/specs/2026-04-25-colin-personal-site-design.md docs/superpowers/plans/2026-04-25-colin-personal-site.md
git commit -m "feat: launch Colin fiery body-map personal website"
```
