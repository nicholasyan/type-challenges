import { Equal, Expect } from '@type-challenges/utils'

type MyOmit<T, K extends keyof T> = {
  [key in Exclude<keyof T, K>]: T[key]
};
type Exclude<K, E> = K extends E ? never : K;

type debug = MyOmit<Todo, 'description'>;

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}
