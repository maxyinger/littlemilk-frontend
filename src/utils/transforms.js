/**
 * TODO: remove transforms that exist in popmotion calc
 */

// !this is in popmotion calc
// const dist = ({ x, y }) => {
//   if (isNaN(x) || isNaN(y)) {
//     throw new Error('.dist({x: number, y: number}) required')
//   }
//   return Math.sqrt(x * x + y * y)
// }

// rotate :: point, point -> point
const rotate = ({ x, y }, { unitX, unitY }) => ({
  x : x * unitY + y * unitX,
  y : y * unitY - x * unitX
})

// translate :: point, point -> point
const translate = ({ x, y }, { transX, transY }) => ({
  x : x + transX,
  y : y + transY
})

// !this is in popmotion.calc
const percentToRad = v => (v / 100) * 2 * Math.PI

export default {
  translate,
  rotate,
  percentToRad
}
