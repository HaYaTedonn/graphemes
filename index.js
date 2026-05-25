// graphemes — Emoji- and grapheme-aware string helpers, so length/slice/truncate
// don't break emoji, flags, skin tones or ZWJ sequences (👨‍👩‍👧‍👦).
// Uses Intl.Segmenter when available, with a code-point fallback. Zero dependencies.

const hasSegmenter = typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function';
const segmenter = hasSegmenter ? new Intl.Segmenter(undefined, { granularity: 'grapheme' }) : null;

/**
 * Split a string into an array of grapheme clusters (user-perceived characters).
 * @param {string} str
 * @returns {string[]}
 */
export function toGraphemes(str) {
  const s = String(str);
  if (segmenter) {
    const out = [];
    for (const { segment } of segmenter.segment(s)) out.push(segment);
    return out;
  }
  // Fallback: code points (handles surrogate pairs, but not full ZWJ clusters)
  return Array.from(s);
}

/** Number of grapheme clusters (what a human would count as characters). */
export function length(str) {
  return toGraphemes(str).length;
}

/**
 * Slice by grapheme index (negative indices count from the end).
 * @param {string} str
 * @param {number} [start]
 * @param {number} [end]
 */
export function slice(str, start, end) {
  return toGraphemes(str).slice(start, end).join('');
}

/** Grapheme at the given index (supports negative). */
export function at(str, index) {
  const g = toGraphemes(str);
  const i = index < 0 ? g.length + index : index;
  return g[i];
}

/** Reverse a string by graphemes (keeps emoji/ZWJ sequences intact). */
export function reverse(str) {
  return toGraphemes(str).reverse().join('');
}

/**
 * Truncate to at most `max` graphemes (including the ellipsis).
 * @param {string} str
 * @param {number} max total grapheme budget
 * @param {{ ellipsis?: string }} [opts]
 */
export function truncate(str, max, opts = {}) {
  const { ellipsis = '…' } = opts;
  const g = toGraphemes(str);
  if (g.length <= max) return str;
  const keep = Math.max(0, max - length(ellipsis));
  return g.slice(0, keep).join('') + ellipsis;
}

export default { toGraphemes, length, slice, at, reverse, truncate };
