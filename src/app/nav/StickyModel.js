import { calc, transform } from 'popmotion'
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
export const makeIsFirstEnter = (condition, index, sticky) => dist =>
  dist < condition && index !== sticky

// isFirstExit :: number, number, number -> fn(number -> bool)
export const makeIsFirstExit = (condition, index, sticky) => dist =>
  dist > condition && index === sticky

// mapIsSticky :: fn(number -> bool), fn(number -> bool) -> fn(number -> string)
export const makeMapIsSticky = (isFirstEnter, isFirstExit) =>
  pipe(v => {
    if (isFirstEnter(v)) return 'MAKE_STICKY'
    else if (isFirstExit(v)) return 'BREAK_STICKY'
  })

// makeEmitter :: number, number, number, number -> emitter::fn(point -> string)
export const makeEmitter = (enter, exit, index, sticky, targetCenter) =>
  pipe(
    makeMapCursorVector(targetCenter),
    distFromOrigin,
    makeMapIsSticky(
      makeIsFirstEnter(enter, index, sticky),
      makeIsFirstExit(exit, index, sticky)
    )
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
