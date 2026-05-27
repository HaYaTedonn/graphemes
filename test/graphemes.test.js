import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toGraphemes, length, slice, at, reverse, truncate } from '../index.js';

const family = '👨‍👩‍👧‍👦'; // ZWJ sequence, one grapheme
const thumbs = '👍';

test('length counts graphemes, not code units', () => {
  assert.equal('a👍b'.length > 3, true);          // JS native over-counts
  assert.equal(length('a👍b'), 3);
  assert.equal(length(family), 1);
  assert.equal(length('café'), 4);
});

test('toGraphemes splits correctly', () => {
  assert.deepEqual(toGraphemes('a👍b'), ['a', thumbs, 'b']);
  assert.deepEqual(toGraphemes(family), [family]);
});

test('slice by grapheme index', () => {
  assert.equal(slice('a👍b😀c', 1, 3), '👍b');
  assert.equal(slice('a👍b', -1), 'b');
  assert.equal(slice('a👍b😀c', 2), 'b😀c');
});

test('at supports negative', () => {
  assert.equal(at('a👍b', 1), thumbs);
  assert.equal(at('a👍b', -1), 'b');
});

test('reverse keeps emoji intact', () => {
  assert.equal(reverse('a👍b'), 'b👍a');
  assert.equal(reverse(`x${family}y`), `y${family}x`);
});

test('truncate does not break emoji', () => {
  assert.equal(truncate('hello', 10), 'hello');
  assert.equal(truncate('a👍b😀c', 3), 'a👍…'); // 2 kept + ellipsis = 3
  assert.equal(length(truncate('a👍b😀cd', 4)), 4);
});
