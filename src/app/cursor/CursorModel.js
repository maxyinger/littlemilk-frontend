import { easing, tween, transform } from 'popmotion'
import styles from './CursorStyles'

const { pipe, transformMap, linearSpring } = transform

// Easier tween handler
export const makeTween = (
  currentStyles,
  nextStyles,
  duration = 300,
  ease = easing.backOut
) =>
  tween({
    from : currentStyles,
    to   : { ...styles.normal, ...nextStyles },
    duration,
    ease
  })

// makeSticky :: point, number -> fn(point -> point)
export const makeSticky = (targetCenter, springStrength) =>
  pipe(
    transformMap({
      x : linearSpring(springStrength, targetCenter.x),
      y : linearSpring(springStrength, targetCenter.y)
    })
  )
