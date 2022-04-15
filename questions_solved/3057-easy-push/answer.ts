import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils'

type Push<T extends any[], U> = [...T, U];

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
  Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
]
