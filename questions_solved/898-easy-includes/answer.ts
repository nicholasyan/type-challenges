import { Equal, Expect } from '@type-challenges/utils'

/**
 * 
 * A LESSON IN DISTRIBUTIVE CONDITIONAL TYPES
 * https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
 * 
 */

type Extends<T, U> = T extends U ? 1 : 2;
// type is 1 | 2 (why?)
type BooleanExtendsFalse = Extends<boolean, false>;

/**
 * Elements:
 * 
 * 1) T extends U is true when the type T is assignable to the type U.
 * 2) When a union is passed to a conditional type, the conditional type is
 *    distributed over the values of a union. 
 * 3) The boolean type is implemented as a union of true | false.
 * 
 * Explanation:
 * 
 * When boolean is passed to the Extends generic, the conditional is
 * distributed over each element in the union, true and false. Since false
 * extends false but true doesn't, we can hit both branches of the 
 * conditional and the return result is 1 | 2.
 */

/**
 * Note that to opt out of the distributive behavior, we "surround each side 
 * of the extends keyword with square brackets".
 */
type ExtendsWithTuple<T, U> = [T] extends [U] ? 1 : 2;
// type is 2 (woohoo!)
type BooleanExtendsFalse2 = ExtendsWithTuple<true | false, false>;

/**
 * We end up not wanting a distribution-based solution here because:
 * - we need equality checks
 * - boolean equality checks don't play nicely when the boolean is distributed
 * 
 * So instead, we can iterate through the elements in the array by recursively
 * checking them in a conditional.
 */
type Includes<T extends readonly any[], U> = 
  T extends [infer First, ...infer Rest] 
    ? Equal<First, U> extends true 
      ? true : 
      Includes<Rest, U>
    : false;

/**
 * The below ends up asserting that there just is a first element in the array
 * - the Rest can be anything from 0 to infininte elements.
 */
type IsNonEmptyArray<T extends readonly any[]> = T extends [infer _, ...infer _] ? true : false;
// false
type t = IsNonEmptyArray<[]>;
// true
type t2 = IsNonEmptyArray<[1]>;
// true
type t3 = IsNonEmptyArray<[1, 2]>;

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
  Expect<Equal<Includes<[], undefined>, false>>,
]
