/** Split a string into grapheme clusters (user-perceived characters). */
export function toGraphemes(str: string): string[];
/** Number of grapheme clusters. */
export function length(str: string): number;
/** Slice by grapheme index (negative indices count from the end). */
export function slice(str: string, start?: number, end?: number): string;
/** Grapheme at the given index (supports negative). */
export function at(str: string, index: number): string | undefined;
/** Reverse a string by graphemes. */
export function reverse(str: string): string;
/** Truncate to at most `max` graphemes (including the ellipsis). */
export function truncate(str: string, max: number, opts?: { ellipsis?: string }): string;
declare const _default: {
  toGraphemes: typeof toGraphemes; length: typeof length; slice: typeof slice;
  at: typeof at; reverse: typeof reverse; truncate: typeof truncate;
};
export default _default;
