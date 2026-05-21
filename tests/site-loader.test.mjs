import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadScriptApi } from './script-api.mjs';

const {
  bootSite,
  getPreloadAssetUrls,
  waitForSiteAssets
} = loadScriptApi();

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('index starts behind a loading screen and marks the app inert', () => {
  const html = read('index.html');

  assert.match(html, /<body[^>]+class="[^"]*is-loading[^"]*"/);
  assert.match(html, /<div class="site-loader"[^>]+data-site-loader/);
  assert.match(html, /<main class="site-main"[^>]+data-site-app[^>]+inert/);
  assert.doesNotMatch(html, /<script[^>]+data-loader-fallback/);
  assert.doesNotMatch(html, /setTimeout\(release,\s*3200\)/);
  assert.match(html, /<noscript>/);
});

test('styles define loading screen states and reveal the app after assets load', () => {
  const css = read('styles.css');

  [
    '.site-loader',
    '.site-loader__bar span',
    '.site-loader__signal',
    'body.is-loading .site-main',
    'body.is-loaded .site-loader'
  ].forEach((token) => {
    assert.match(css, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  });
});

test('preload list covers the visual assets used by CSS image variables', () => {
  const css = read('styles.css');
  const urls = getPreloadAssetUrls();

  const cssAssets = [
    ...css.matchAll(/url\(["']?(assets\/[^"')]+)["']?\)/g)
  ].map((match) => match[1]);

  [...new Set(cssAssets)].forEach((asset) => {
    assert.ok(urls.includes(asset), `${asset} should be preloaded`);
  });
});

test('waitForSiteAssets tracks successful image preloads', async () => {
  const loaded = [];
  const win = {
    Image: class {
      set src(value) {
        loaded.push(value);
        queueMicrotask(() => this.onload?.());
      }
    },
    document: {
      fonts: {
        ready: Promise.resolve('fonts ready')
      }
    }
  };

  const result = await waitForSiteAssets(win, ['a.webp', 'b.webp']);

  assert.equal(result.loaded, 2);
  assert.equal(result.failed, 0);
  assert.deepEqual(loaded, ['a.webp', 'b.webp']);
});

test('waitForSiteAssets waits for every image asset before resolving', async () => {
  const loaded = [];
  const images = [];
  const win = {
    Image: class {
      constructor() {
        images.push(this);
      }

      set src(value) {
        loaded.push(value);
        if (value !== 'stuck.webp') {
          queueMicrotask(() => this.onload?.());
        }
      }
    }
  };

  let settled = false;
  const assetsReady = waitForSiteAssets(win, ['a.webp', 'b.webp', 'stuck.webp']).then((result) => {
    settled = true;
    return result;
  });

  await Promise.resolve();
  await Promise.resolve();

  assert.equal(settled, false);

  images[2].onload();
  const result = await assetsReady;

  assert.equal(result.loaded, 3);
  assert.equal(result.total, 3);
  assert.equal(result.ready, true);
  assert.deepEqual(loaded, ['a.webp', 'b.webp', 'stuck.webp']);
});

test('waitForSiteAssets waits for all image load or error events', async () => {
  const win = {
    Image: class {
      set src(value) {
        if (value === 'broken.webp') {
          queueMicrotask(() => this.onerror?.());
        } else {
          queueMicrotask(() => this.onload?.());
        }
      }
    },
    setTimeout
  };

  const result = await waitForSiteAssets(win, ['loaded.webp', 'broken.webp']);

  assert.equal(result.loaded, 1);
  assert.equal(result.failed, 1);
  assert.equal(result.total, 2);
  assert.equal(result.ready, false);
  assert.equal(result.timedOut, false);
});

test('bootSite releases the loading screen after assets are ready', async () => {
  const classList = new Set(['is-loading']);
  const changed = [];
  const app = {
    removeAttribute(name) {
      changed.push(`app:${name}`);
    }
  };
  const loader = {
    setAttribute(name, value) {
      changed.push(`loader:${name}:${value}`);
    }
  };
  const doc = {
    body: {
      classList: {
        add(value) {
          classList.add(value);
          changed.push(`add:${value}`);
        },
        remove(value) {
          classList.delete(value);
          changed.push(`remove:${value}`);
        },
        toggle(value, force) {
          if (force) {
            classList.add(value);
          } else {
            classList.delete(value);
          }
          changed.push(`toggle:${value}:${force}`);
        }
      }
    },
    documentElement: {
      classList: {
        add(...values) {
          values.forEach((value) => changed.push(`html:add:${value}`));
        },
        toggle(value, force) {
          changed.push(`html:toggle:${value}:${force}`);
        }
      }
    },
    querySelector(selector) {
      if (selector === '[data-site-app]') return app;
      if (selector === '[data-site-loader]') return loader;
      return null;
    },
    querySelectorAll() {
      return [];
    }
  };
  const win = {
    Image: class {
      set src(value) {
        queueMicrotask(() => this.onload?.());
      }
    },
    document: { fonts: { ready: Promise.resolve() } },
    matchMedia: () => ({ matches: false }),
    setTimeout
  };

  await bootSite(doc, win);

  assert.equal(classList.has('is-loading'), false);
  assert.equal(classList.has('is-loaded'), true);
  assert.ok(changed.indexOf('remove:is-loading') < changed.indexOf('html:add:js'));
  assert.ok(changed.includes('app:inert'));
  assert.ok(changed.includes('loader:aria-hidden:true'));
});

test('bootSite keeps the loader visible for a short minimum duration', async () => {
  const timeouts = [];
  const classList = new Set(['is-loading']);
  const doc = {
    body: {
      classList: {
        add(value) {
          classList.add(value);
        },
        remove(value) {
          classList.delete(value);
        },
        toggle() {}
      }
    },
    documentElement: {
      classList: {
        add() {},
        toggle() {}
      }
    },
    querySelector(selector) {
      if (selector === '[data-site-app]') return { removeAttribute() {} };
      if (selector === '[data-site-loader]') return { setAttribute() {} };
      return null;
    },
    querySelectorAll() {
      return [];
    }
  };
  const win = {
    Image: class {
      set src(value) {
        queueMicrotask(() => this.onload?.());
      }
    },
    document: { fonts: { ready: Promise.resolve() } },
    matchMedia: () => ({ matches: false }),
    setTimeout(callback, delay) {
      timeouts.push({ callback, delay });
      return timeouts.length;
    },
    clearTimeout() {
    }
  };

  const boot = bootSite(doc, win);
  await Promise.resolve();
  await Promise.resolve();

  assert.equal(classList.has('is-loading'), true);
  timeouts.find((timeout) => timeout.delay === 1500).callback();
  await boot;

  assert.equal(classList.has('is-loading'), false);
  assert.equal(classList.has('is-loaded'), true);
});
