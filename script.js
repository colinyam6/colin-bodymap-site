export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('js');
  });
}
