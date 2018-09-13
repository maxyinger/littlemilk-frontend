import { transform } from 'popmotion'
import {
  makeMapCursorVector,
  distFromOrigin,
  makeIsFirstEnter,
  makeIsFirstExit,
  makeMapIsSticky,
  boundingBoxCenter,
  makeEmitter,
  makeSticky
} from './StickyModel'

describe('makeSticky', () => {
  const targetCenter = {
    x : 50,
    y : 50
  }
  const springStrength = 0.6
  const result = {
    x : transform.linearSpring(springStrength, 0)(150),
    y : transform.linearSpring(springStrength, 0)(150)
  }
  it(`should return the point ${result}`, () => {
    expect(
      makeSticky(targetCenter, springStrength)({ x: 200, y: 200 })
    ).toEqual(result)
  })
})

describe('makeEmitter', () => {
  const enter = 200
  const exit = 100
  const index = 1
  const sticky = -1
  const targetCenter = {
    x : 50,
    y : 50
  }
  const emitter = makeEmitter(enter, exit, index, sticky, targetCenter)
  it('returns a function', () =>
    expect(emitter instanceof Function).toEqual(true))

  it('returns undefined if not invoked', () =>
    expect(emitter({ x: 1000, y: 1000 })).toEqual(undefined))

  it('returns MAKE_STICKY when isFirstEnter -> true', () =>
    expect(emitter({ x: 5, y: 5 })).toEqual('MAKE_STICKY'))
})

describe('boundingBoxCenter', () => {
  it('returns {x: 50, y: 50} from top:0, left: 0, height: 100, width: 100 box', () => {
    const boundingBox = {
      top    : 0,
      left   : 0,
      height : 100,
      width  : 100
    }
    const result = { x: 50, y: 50 }
    expect(boundingBoxCenter(boundingBox)).toEqual(result)
  })
})

describe('makeMapCursorVector', () => {
  it('should return a mapped point from 2 points', () => {
    const cursor = { x: 200, y: 200 }
    const targetCenter = {
      x : 50,
      y : 50
    }
    const result = { x: 150, y: 150 }
    expect(makeMapCursorVector(targetCenter)(cursor)).toEqual(result)
  })
})

describe('distFromOrigin', () => {
  it('should return a distance::number from a point relative to { 0, 0 }', () => {
    const mappedCursor = { x: 3, y: 4 }
    const result = 5
    expect(distFromOrigin(mappedCursor)).toEqual(result)
  })
})

describe('makeMapIsSticky', () => {
  it('should return MAKE_STICKY on isFirstEnter() -> true', () => {
    const isFirstEnter = () => true
    const isFirstExit = () => false
    expect(makeMapIsSticky(isFirstEnter, isFirstExit)(10)).toEqual(
      'MAKE_STICKY'
    )
  })
  it('should return BREAK_STICKY on isFirstExit() -> true', () => {
    const isFirstEnter = () => false
    const isFirstExit = () => true
    expect(makeMapIsSticky(isFirstEnter, isFirstExit)(10)).toEqual(
      'BREAK_STICKY'
    )
  })
  it('should return undefined if isFirstEnter() -> false && isFirstExit() -> false', () => {
    const isFirstEnter = () => false
    const isFirstExit = () => false
    console.log(makeMapIsSticky(isFirstEnter, isFirstExit)(10))
    expect(makeMapIsSticky(isFirstEnter, isFirstExit)(10)).toEqual(undefined)
  })
})

describe('makeIsFirstEnter', () => {
  const cursorDist = 9
  const enter = 10
  let index = 1
  let sticky = -1
  it('should return true on first time less than enter', () => {
    expect(makeIsFirstEnter(enter, index, sticky)(cursorDist)).toEqual(true)
  })
  it('should return false on subsequent times less than enter', () => {
    index = 1
    sticky = 1
    expect(makeIsFirstEnter(enter, index, sticky)(cursorDist)).toEqual(false)
  })
})

describe('makeIsFirstExit', () => {
  const cursorDist = 23
  const exit = 20
  let index = 1
  let sticky = 1
  it('should return true on first time greater than exit', () => {
    expect(makeIsFirstExit(exit, index, sticky)(cursorDist)).toEqual(true)
  })
  it('should return false on subsequent times greater than exit', () => {
    index = 1
    sticky = -1
    expect(makeIsFirstExit(exit, index, sticky)(cursorDist)).toEqual(false)
  })
})
