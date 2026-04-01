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
        if (!entry.isIntersecting) {
          return;
        }

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
