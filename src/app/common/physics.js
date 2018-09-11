import { physics as popPhysics } from 'popmotion'

const config = {
  friction : 0.85,
  strength : 150
}

// physics :: value, config::optional -> actionInstance
const physics = (
  rx,
  { friction, springStrength } = {
    friction       : config.friction,
    springStrength : config.strength
  }
) =>
  popPhysics({
    velocity  : rx.getVelocity(),
    friction,
    springStrength,
    to        : rx.get(),
    restSpeed : false
  }).start(rx)

export default physics

// const nav = value =>
//   physics({
//     velocity       : value.getVelocity(),
//     friction       : 0.925,
//     springStrength : 280,
//     to             : value.get(),
//     restSpeed      : false
//   }).start(value)

// const cursor = value =>
//   physics({
//     velocity       : value.getVelocity(),
//     friction       : 0.85,
//     springStrength : 150,
//     to             : value.get(),
//     restSpeed      : false
//   }).start(value)

// export default {
//   cursor,
//   nav
// }
