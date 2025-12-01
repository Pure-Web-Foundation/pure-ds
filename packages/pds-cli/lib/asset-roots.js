import path from 'path';
import { resolvePublicAssetURL, getPublicRootCandidate, __internal } from '../../../src/js/pds-core/pds-paths.js';

const URL_PATTERN = __internal.URL_PATTERN;
const PDS_SEGMENT = __internal.DEFAULT_SEGMENT;

function trimTrailingSeparators(value) {
  return value.replace(/[\\/]+$/, '');
}

export function ensurePdsPath(input) {
  if (!input || typeof input !== 'string') return input;
  let target = trimTrailingSeparators(input);
  if (/[\\/]pds$/i.test(target)) {
    return target;
  }
  return path.join(target, PDS_SEGMENT);
}

export function resolvePublicAssetDirectory(config, options = {}) {
  const webRootPath = options.webRootPath;
  const cwd = options.cwd || process.cwd();
  const overrideRoot = options.overrideRoot;
  const candidate = (overrideRoot ?? getPublicRootCandidate(config)) || '';

  if (candidate && typeof candidate === 'string' && !URL_PATTERN.test(candidate.trim())) {
    let target = candidate.trim();
    if (target) {
      if (!path.isAbsolute(target)) {
        target = path.resolve(cwd, target);
      }
      return ensurePdsPath(target);
    }
  }

  if (webRootPath) {
    return ensurePdsPath(path.join(webRootPath, 'assets'));
  }

  return ensurePdsPath(path.resolve(cwd, 'public', 'assets'));
}

export function isUrlLike(value) {
  return typeof value === 'string' && URL_PATTERN.test(value.trim());
}

export { resolvePublicAssetURL, getPublicRootCandidate };
