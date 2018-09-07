import { physics } from 'popmotion'

/**
 * ! must keep reference and run .stop() when finished
 * @param {value} value - popmotion value
 * @returns {Action} startedAction
 */

const nav = value =>
  physics({
    velocity       : value.getVelocity(),
    friction       : 0.925,
    springStrength : 280,
    to             : value.get(),
    restSpeed      : false
  }).start(value)

const cursor = value =>
  physics({
    velocity       : value.getVelocity(),
    friction       : 0.85,
    springStrength : 150,
    to             : value.get(),
    restSpeed      : false
  }).start(value)

export default {
  cursor,
  nav
}
