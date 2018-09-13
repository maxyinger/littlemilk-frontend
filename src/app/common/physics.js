import { physics as popPhysics } from 'popmotion'

// const config = {
//   friction : 0.85,
//   strength : 150
// }

const config = {
  friction : 0.925,
  strength : 280
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
