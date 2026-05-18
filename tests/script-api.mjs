import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

export const loadScriptApi = () => {
  const context = {
    clearTimeout,
    queueMicrotask,
    setTimeout
  };
  const source = readFileSync(new URL('../script.js', import.meta.url), 'utf8');

  runInNewContext(source, context, { filename: 'script.js' });

  return context.ColinSite;
};
