import { Alike, Expect, MergeInsertions } from '@type-challenges/utils'

type Exclude<K, E> = K extends E ? never : K;
type MyReadonly2<T, K extends keyof T = keyof T> = {
  +readonly [S in K]: T[S]
} & {
  [S in Exclude<keyof T, K>]: T[S]
};

/**
 * Note 1:
 * 
 * Cleaner written as below, with TypeScript utilities.
 * type MyReadonly2<T, K extends keyof T = keyof T> = Readonly<Pick<T, K>> & Omit<T, K>;
 */

/**
 * Note 2:
 * 
 * The solution of the form:
 * 
 * type MyReadonly2<T, K extends keyof T = keyof T> = T & {
 *   +readonly [S in K]: T[S]
 * }
 * 
 * doesn't seem to pass the test cases. My guess is that when the Alike method flattens
 * the object, the ordering of the object properties is not key and so the `readonly`s
 * do not carry over.
 */

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
]

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}
