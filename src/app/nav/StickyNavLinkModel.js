import { calc, transform } from 'popmotion'
const { pipe, transformMap, linearSpring } = transform

// makeMapCursorVector :: boundingBox -> fn(point -> point)
export const makeMapCursorVector = targetBoundingBox => cursor => ({
  x : cursor.x - (targetBoundingBox.left + targetBoundingBox.width / 2),
  y : cursor.y - (targetBoundingBox.top + targetBoundingBox.height / 2)
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
export const makeEmitter = (enter, exit, index, sticky, targetBoundingBox) =>
  pipe(
    makeMapCursorVector(targetBoundingBox),
    distFromOrigin,
    makeMapIsSticky(
      makeIsFirstEnter(enter, index, sticky),
      makeIsFirstExit(exit, index, sticky)
    )
  )

// makeSticky :: boundingBox, number -> fn(point -> point)
export const makeSticky = (targetBoundingBox, springStrength) =>
  pipe(
    makeMapCursorVector(targetBoundingBox),
    transformMap({
      x : linearSpring(springStrength, 0),
      y : linearSpring(springStrength, 0)
    })
  )

// transformXY node, point -> styledNode
export const transformXY = (node, { x, y }) =>
  (node.style.transform = `translate3d(${x}px, ${y}px, 0px)`)
