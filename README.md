# graphemes

Emoji- and grapheme-aware string helpers, so `length`, `slice`, `truncate` and `reverse` don't break emoji, flags, skin tones or ZWJ sequences (👨‍👩‍👧‍👦).

In JavaScript, `'a👍b'.length` is `4`, and naive `slice`/`reverse` can split an emoji in half. `graphemes` counts and cuts by **user-perceived characters** using `Intl.Segmenter` (with a code-point fallback). Zero dependencies.

## Install
```bash
npm install @suzukihayate/graphemes
```

## Usage
```js
import { length, slice, truncate, reverse, toGraphemes, at } from '@suzukihayate/graphemes';

length('a👍b');          // 3   (native .length is 4)
length('👨‍👩‍👧‍👦');         // 1   (a single ZWJ grapheme)

slice('a👍b😀c', 1, 3);  // "👍b"
reverse('a👍b');         // "b👍a"  (emoji stays intact)
truncate('a👍b😀c', 3);  // "a👍…"  (no broken emoji)
at('a👍b', 1);           // "👍"

toGraphemes('a👍b');     // ["a", "👍", "b"]
```

## API
- `toGraphemes(str)` → `string[]`
- `length(str)` → grapheme count
- `slice(str, start?, end?)` → grapheme-based slice (negative indices ok)
- `at(str, index)` → grapheme at index (supports negative)
- `reverse(str)` → reverse by graphemes
- `truncate(str, max, { ellipsis? })` → truncate to ≤ `max` graphemes incl. ellipsis

> Uses `Intl.Segmenter` when available (Node 16+, modern browsers). Falls back to code points otherwise.

## Test
```bash
node --test
```

## License
MIT © 2026 Hayate Suzuki
