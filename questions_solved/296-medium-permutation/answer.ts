import { Equal, Expect } from '@type-challenges/utils'

// ----------------------------------------------------------------------------
// General Approach
// ----------------------------------------------------------------------------
//
// Breaking down the below classes of solutions into parts:
//
// 1) Find a way to extract the union values from the union.
// 2) Extract a union value + recurse after excluding that union value from
//    the recursive call's input.
// 3) Sew all of the recursive returns back up together.
//
// This has been the hardest problem for me to solve so far and tests a lot of 
// the concepts that I've learned but haven't yet put together yet.

// ----------------------------------------------------------------------------
// Way to extract the union values #1
// ----------------------------------------------------------------------------
// `in` operator

type Permutation<Union extends string> = [Union] extends [never]
  ? []
  : {
    [Value in Union]: Exclude<Union, Value> extends never
      ? [Value]
      : [Value, ...Permutation<Exclude<Union, Value>>]
  }[Union];
// This last part where we index into the object with Union is also tricky to
// me.
//
// Explanation:
// 1) Our end goal is to end up with an object with just the permutations.
// 2) At each step, we're iterating over the values in the passed-in Union and
//    composing an object with each Union value as a property and the 
//    actual permutation as the property's value.
// 3) In order to end up with our desired format, we need to flatten the object
//    and just get these property values - that's done by supplying the object 
//    with all of the possible keys which is Union.
//
// Another tricky aspect:
// We need to put [Union] extends [never] in brackets because we don't want
// Union, if its value is never, to be distributed; TypeScript implements never
// as an empty union so it will never actually evaluate the distributed 
// conditional and instead just automatically return never!

// ----------------------------------------------------------------------------
// Way to extract the union values #2
// ----------------------------------------------------------------------------
// Distributive conditional types

type Permutation2<T, K=T> =
    [T] extends [never]
      ? []
      : K extends K
        ? [K, ...Permutation2<Exclude<T, K>>]
        : never

// The key revelation here is that we can iterate over the values in the union
// and then operate on the remainder in the union by recursing over the union
// with the currently-processed value excluded.
//
// The other neat trick is that we use the second parameter with the default,
// K = T, to give us a second copy of the union that we can process in a
// distributed manner (after we've already said to treat T in an undistributed
// manner earlier).

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<never>, []>>,
]
