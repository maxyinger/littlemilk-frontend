import { calc, transform } from 'popmotion'
import types from './duck/types'
const { pipe, transformMap, linearSpring } = transform

// makeBoundingBoxCenter :: boundingBox -> point
export const boundingBoxCenter = boundingBox => ({
  x : boundingBox.left + boundingBox.width / 2,
  y : boundingBox.top + boundingBox.height / 2
})

// makeMapCursorVector :: boundingBox -> fn(point -> point)
export const makeMapCursorVector = targetCenter => cursor => ({
  x : cursor.x - targetCenter.x,
  y : cursor.y - targetCenter.y
})

// distFromOrigin :: point -> number
export const distFromOrigin = ({ x, y }) =>
  calc.distance({ x: 0, y: 0 }, { x, y })

// isFirstEnter :: number, number, number -> fn(number -> bool)
export const makeIsFirstEnter = (enterDist, isSticky) => dist =>
  dist < enterDist && !isSticky

// isFirstExit :: number, number, number -> fn(number -> bool)
export const makeIsFirstExit = (exitDist, isSticky) => dist =>
  dist > exitDist && isSticky

// mapIsSticky :: fn(number -> bool), fn(number -> bool) -> fn(number -> string)
export const makeMapIsSticky = (isFirstEnter, isFirstExit) =>
  pipe(v => {
    if (isFirstEnter(v)) return types.MAKE_STICKY
    else if (isFirstExit(v)) return types.BREAK_STICKY
  })

// makeEmitter :: number, number, number, number -> emitter::fn(point -> string)
export const makeEmitter = (enterDist, exitDist, isSticky, targetCenter) =>
  pipe(
    makeMapCursorVector(targetCenter),
    distFromOrigin,
    makeMapIsSticky(
      makeIsFirstEnter(enterDist, isSticky),
      makeIsFirstExit(exitDist, isSticky)
    )
  )

// makeEmitterSticky :: point, number, fn  -> fn(point -> string)
export const makeEmitterSticky = (targetCenter, exitDist) =>
  pipe(
    makeMapCursorVector(targetCenter),
    distFromOrigin,
    v => (v > exitDist ? types.BREAK_STICKY : undefined)
  )

// makeEmitterDefault :: point, number, fn -> fn(point -> string)
export const makeEmitterDefault = (targetCenter, enterDist) =>
  pipe(
    makeMapCursorVector(targetCenter),
    distFromOrigin,
    v => (v < enterDist ? types.MAKE_STICKY : undefined)
  )

// makeSticky :: point, number -> fn(point -> point)
export const makeSticky = (targetCenter, springStrength) =>
  pipe(
    makeMapCursorVector(targetCenter),
    transformMap({
      x : linearSpring(springStrength, 0),
      y : linearSpring(springStrength, 0)
    })
  )
