import { Equal, Expect } from '@type-challenges/utils'

type Replace<S extends string, From extends string, To extends string> = 
  From extends ''
    ? S
    : S extends `${infer Start}${From}${infer End}`
      ? `${Start}${To}${End}`
      : S;

type debug = Replace<'foobarbar', '', 'foo'>;

type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>,
]
