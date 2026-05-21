const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const mapPointerToHeroState = ({ x, y }) => {
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

const mapPointerToTiltState = ({ x, y }) => {
  const safeX = clamp(x, -1, 1);
  const safeY = clamp(y, -1, 1);

  return {
    rotateX: Number((safeY * -8).toFixed(2)),
    rotateY: Number((safeX * 10).toFixed(2)),
    glowX: Number(((safeX + 1) * 50).toFixed(2)),
    glowY: Number(((safeY + 1) * 50).toFixed(2))
  };
};

const getRevealOptions = (reducedMotion) => ({
  threshold: reducedMotion ? 0 : 0.18,
  rootMargin: reducedMotion ? '0px 0px -6% 0px' : '0px 0px -12% 0px'
});

const shouldEnablePointerEffects = (hasFinePointer, hasHover) => hasFinePointer && hasHover;

const getPreloadAssetUrls = () => [
  'assets/hero-energy-warrior-cutout.webp',
  'assets/hero-energy-warrior-cutout.png',
  'assets/body-map-energy-warrior-cutout.webp',
  'assets/body-map-energy-warrior-cutout.png',
  'assets/cards-theme-atlas-cutout.webp',
  'assets/cards-theme-atlas-cutout.png',
  'assets/ambient-banner-constellation-cutout.webp',
  'assets/ambient-banner-constellation-cutout.png',
  'assets/ambient-horizon-glow.webp',
  'assets/ambient-horizon-glow.png',
  'assets/ambient-soft-motifs.webp',
  'assets/ambient-soft-motifs.png',
  'assets/ambient-banner-emberflow.webp',
  'assets/ambient-banner-emberflow.png',
  'assets/ambient-vertical-cascade.webp',
  'assets/ambient-vertical-cascade.png'
];

const minimumLoaderMs = 1500;
const matchesMedia = (win, query) => win.matchMedia?.(query)?.matches ?? false;
const queueFrame = (win, callback) => {
  if (win.requestAnimationFrame) {
    return win.requestAnimationFrame(callback);
  }

  return win.setTimeout(callback, 16);
};

const cancelQueuedFrame = (win, id) => {
  if (win.cancelAnimationFrame) {
    win.cancelAnimationFrame(id);
    return;
  }

  win.clearTimeout?.(id);
};

const setVisible = (elements) => {
  elements.forEach((element) => element.classList.add('is-visible'));
};

const preloadImage = (win, url) => new Promise((resolve) => {
  const image = new win.Image();

  image.onload = () => resolve({ ok: true, url });
  image.onerror = () => resolve({ ok: false, url });
  image.decoding = 'async';
  image.src = url;
});

function waitForSiteAssets(win = window, urls = getPreloadAssetUrls()) {
  const total = urls.length;

  if (!total) {
    return Promise.resolve({
      failed: 0,
      loaded: 0,
      ready: true,
      timedOut: false,
      total
    });
  }

  return Promise.all(urls.map((url) => preloadImage(win, url))).then((results) => {
    const loaded = results.filter((result) => result.ok).length;
    const failed = total - loaded;

    return {
      failed,
      loaded,
      ready: loaded === total,
      timedOut: false,
      total
    };
  });
}

const waitForMinimumLoaderTime = (win = window, duration = minimumLoaderMs) => new Promise((resolve) => {
  win.setTimeout(resolve, duration);
});

const releaseLoadingScreen = (doc = document) => {
  const app = doc.querySelector('[data-site-app]');
  const loader = doc.querySelector('[data-site-loader]');

  doc.body.classList.remove('is-loading');
  doc.body.classList.add('is-loaded');
  app?.removeAttribute('inert');
  loader?.setAttribute('aria-hidden', 'true');
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
  const hotspots = [...doc.querySelectorAll('[data-body-hotspot]')];

  if (panels[0]) {
    syncActiveBodyPanel(doc, panels[0].dataset.bodyPanel);
  }

  hotspots.forEach((hotspot) => {
    hotspot.addEventListener('click', () => syncActiveBodyPanel(doc, hotspot.dataset.bodyHotspot));
  });

  if (!panels.length || !('IntersectionObserver' in win)) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    const activeEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

    if (!activeEntry) {
      return;
    }

    syncActiveBodyPanel(doc, activeEntry.target.dataset.bodyPanel);
  }, {
    threshold: reducedMotion ? 0.12 : 0.48
  });

  panels.forEach((panel) => observer.observe(panel));
};

const initTiltCards = (doc, win, enablePointerEffects) => {
  const cards = [...doc.querySelectorAll('[data-tilt-card]')];

  if (!enablePointerEffects) {
    return;
  }

  cards.forEach((card) => {
    let pendingPointer = null;
    let frameId = 0;

    const updateTilt = () => {
      frameId = 0;

      if (!pendingPointer) {
        return;
      }

      const bounds = card.getBoundingClientRect();
      const x = ((pendingPointer.clientX - bounds.left) / bounds.width) * 2 - 1;
      const y = ((pendingPointer.clientY - bounds.top) / bounds.height) * 2 - 1;
      const state = mapPointerToTiltState({ x, y });

      card.classList.add('is-tilting');
      card.style.setProperty('--card-rotate-x', `${state.rotateX}deg`);
      card.style.setProperty('--card-rotate-y', `${state.rotateY}deg`);
      card.style.setProperty('--card-glow-x', `${state.glowX}%`);
      card.style.setProperty('--card-glow-y', `${state.glowY}%`);
    };

    card.addEventListener('pointermove', (event) => {
      pendingPointer = {
        clientX: event.clientX,
        clientY: event.clientY
      };

      if (!frameId) {
        frameId = queueFrame(win, updateTilt);
      }
    }, { passive: true });

    card.addEventListener('pointerleave', () => {
      pendingPointer = null;

      if (frameId) {
        cancelQueuedFrame(win, frameId);
        frameId = 0;
      }

      card.classList.remove('is-tilting');
      card.style.removeProperty('--card-rotate-x');
      card.style.removeProperty('--card-rotate-y');
      card.style.removeProperty('--card-glow-x');
      card.style.removeProperty('--card-glow-y');
    });
  });
};

function initSite(doc = document, win = window) {
  const reducedMotion = matchesMedia(win, '(prefers-reduced-motion: reduce)');
  const enablePointerEffects = !reducedMotion && shouldEnablePointerEffects(
    matchesMedia(win, '(pointer: fine)'),
    matchesMedia(win, '(hover: hover)')
  );
  const revealItems = [...doc.querySelectorAll('[data-reveal]')];
  const hero = doc.querySelector('[data-parallax-root]');
  const cta = doc.querySelector('.hero__cta');

  doc.documentElement.classList.add('js', 'is-ready');
  doc.documentElement.classList.toggle('reduce-motion', reducedMotion);
  doc.documentElement.classList.toggle('pointer-effects', enablePointerEffects);

  if (reducedMotion || !('IntersectionObserver' in win)) {
    setVisible(revealItems);
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, getRevealOptions(reducedMotion));

    revealItems.forEach((item) => observer.observe(item));
  }

  if (hero && enablePointerEffects) {
    let pendingHeroPointer = null;
    let heroFrameId = 0;

    const updateHeroPointer = () => {
      heroFrameId = 0;

      if (!pendingHeroPointer) {
        return;
      }

      const bounds = hero.getBoundingClientRect();
      const x = ((pendingHeroPointer.clientX - bounds.left) / bounds.width) * 2 - 1;
      const y = ((pendingHeroPointer.clientY - bounds.top) / bounds.height) * 2 - 1;
      const state = mapPointerToHeroState({ x, y });

      hero.style.setProperty('--pointer-rotate-x', `${state.rotateX}`);
      hero.style.setProperty('--pointer-rotate-y', `${state.rotateY}`);
      hero.style.setProperty('--pointer-shift-x', `${state.shiftX}`);
      hero.style.setProperty('--pointer-shift-y', `${state.shiftY}`);
      hero.style.setProperty('--pointer-glow-x', `${state.glowX}%`);
      hero.style.setProperty('--pointer-glow-y', `${state.glowY}%`);
    };

    hero.addEventListener('pointermove', (event) => {
      pendingHeroPointer = {
        clientX: event.clientX,
        clientY: event.clientY
      };

      if (!heroFrameId) {
        heroFrameId = queueFrame(win, updateHeroPointer);
      }
    }, { passive: true });

    hero.addEventListener('pointerleave', () => {
      pendingHeroPointer = null;

      if (heroFrameId) {
        cancelQueuedFrame(win, heroFrameId);
        heroFrameId = 0;
      }

      ['--pointer-rotate-x', '--pointer-rotate-y', '--pointer-shift-x', '--pointer-shift-y'].forEach((token) => {
        hero.style.setProperty(token, '0');
      });
      hero.style.setProperty('--pointer-glow-x', '50%');
      hero.style.setProperty('--pointer-glow-y', '36%');
    });
  }

  if (cta) {
    cta.addEventListener('pointerenter', () => hero?.classList.add('is-energized'));
    cta.addEventListener('pointerleave', () => hero?.classList.remove('is-energized'));
  }

  initBodyMap(doc, win, reducedMotion);
  initTiltCards(doc, win, enablePointerEffects);
}

async function bootSite(doc = document, win = window) {
  await Promise.all([
    waitForSiteAssets(win),
    waitForMinimumLoaderTime(win)
  ]);
  releaseLoadingScreen(doc);
  initSite(doc, win);
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    bootSite();
  });
}

globalThis.ColinSite = {
  bootSite,
  clamp,
  getPreloadAssetUrls,
  getRevealOptions,
  initSite,
  mapPointerToHeroState,
  mapPointerToTiltState,
  releaseLoadingScreen,
  shouldEnablePointerEffects,
  waitForMinimumLoaderTime,
  waitForSiteAssets
};
