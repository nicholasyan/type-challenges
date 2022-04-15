import { Alike, Expect } from '@type-challenges/utils'

/**
 * The important realizations are that:
 * - we can store the state of the type on the generic inferred by the overall
 *   type
 * - in order to be able to update this state based on the key and value in 
 *   the option call, we need to lift those values into the type space (again
 *   by making them generics)
 */
type Chainable<Options = {}> = {
  option<K extends string, V>(key: K extends keyof Options ? never : K, value: V): Chainable<Options & {
    [key in K]: V
  }>;
  get(): Options;
}

declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}