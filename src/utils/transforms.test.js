import transforms from './transforms'

describe('.dist({ x, y })', () => {
  describe.each`
    a     | b     | expected
    ${1}  | ${1}  | ${Math.sqrt(2)}
    ${-1} | ${1}  | ${Math.sqrt(2)}
    ${-1} | ${-1} | ${Math.sqrt(2)}
    ${2}  | ${10} | ${Math.sqrt(104)}
  `('.dist({x: $a, y: $b})', ({ a, b, expected }) => {
  test(`returns ${expected}`, () => {
    expect(transforms.dist({ x: a, y: b })).toBe(expected)
  })
})

  describe('throws an error on non numbers', () => {
    test('x and y must be defined', () => {
      expect(() => transforms.dist({ a: 3, b: 8 })).toThrow()
    })
    test('x and y must be numbers', () => {
      expect(() => transforms.dist({ x: {}, y: 5 })).toThrow()
    })
  })
})
