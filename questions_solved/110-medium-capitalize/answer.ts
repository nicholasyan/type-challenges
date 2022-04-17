import { Equal, Expect } from '@type-challenges/utils'

type MyCapitalize<S extends string> = S extends `${infer First}${infer Rest}` 
  ? 
    First extends 'a' ? `A${Rest}` :
    First extends 'b' ? `B${Rest}` :
    First extends 'c' ? `C${Rest}` :
    First extends 'd' ? `D${Rest}` :
    First extends 'e' ? `E${Rest}` :
    First extends 'f' ? `F${Rest}` :
    First extends 'g' ? `G${Rest}` :
    First extends 'h' ? `H${Rest}` :
    First extends 'i' ? `I${Rest}` :
    First extends 'j' ? `J${Rest}` :
    First extends 'k' ? `K${Rest}` :
    First extends 'l' ? `L${Rest}` :
    First extends 'm' ? `M${Rest}` :
    First extends 'n' ? `N${Rest}` :
    First extends 'o' ? `O${Rest}` :
    First extends 'p' ? `P${Rest}` :
    First extends 'q' ? `Q${Rest}` :
    First extends 'r' ? `R${Rest}` :
    First extends 's' ? `S${Rest}` :
    First extends 't' ? `T${Rest}` :
    First extends 'u' ? `U${Rest}` :
    First extends 'v' ? `V${Rest}` :
    First extends 'w' ? `W${Rest}` :
    First extends 'x' ? `X${Rest}` :
    First extends 'y' ? `Y${Rest}` :
    First extends 'z' ? `Z${Rest}` : S
  : S;

type cases = [
  Expect<Equal<MyCapitalize<'foobar'>, 'Foobar'>>,
  Expect<Equal<MyCapitalize<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<MyCapitalize<'foo bar'>, 'Foo bar'>>,
  Expect<Equal<MyCapitalize<''>, ''>>,
  Expect<Equal<MyCapitalize<'a'>, 'A'>>,
  Expect<Equal<MyCapitalize<'b'>, 'B'>>,
  Expect<Equal<MyCapitalize<'c'>, 'C'>>,
  Expect<Equal<MyCapitalize<'d'>, 'D'>>,
  Expect<Equal<MyCapitalize<'e'>, 'E'>>,
  Expect<Equal<MyCapitalize<'f'>, 'F'>>,
  Expect<Equal<MyCapitalize<'g'>, 'G'>>,
  Expect<Equal<MyCapitalize<'h'>, 'H'>>,
  Expect<Equal<MyCapitalize<'i'>, 'I'>>,
  Expect<Equal<MyCapitalize<'j'>, 'J'>>,
  Expect<Equal<MyCapitalize<'k'>, 'K'>>,
  Expect<Equal<MyCapitalize<'l'>, 'L'>>,
  Expect<Equal<MyCapitalize<'m'>, 'M'>>,
  Expect<Equal<MyCapitalize<'n'>, 'N'>>,
  Expect<Equal<MyCapitalize<'o'>, 'O'>>,
  Expect<Equal<MyCapitalize<'p'>, 'P'>>,
  Expect<Equal<MyCapitalize<'q'>, 'Q'>>,
  Expect<Equal<MyCapitalize<'r'>, 'R'>>,
  Expect<Equal<MyCapitalize<'s'>, 'S'>>,
  Expect<Equal<MyCapitalize<'t'>, 'T'>>,
  Expect<Equal<MyCapitalize<'u'>, 'U'>>,
  Expect<Equal<MyCapitalize<'v'>, 'V'>>,
  Expect<Equal<MyCapitalize<'w'>, 'W'>>,
  Expect<Equal<MyCapitalize<'x'>, 'X'>>,
  Expect<Equal<MyCapitalize<'y'>, 'Y'>>,
  Expect<Equal<MyCapitalize<'z'>, 'Z'>>,
]
