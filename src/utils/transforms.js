/**
 * @param { x, y } point - an { x, y } coordinate in pixels
 * @returns distance from point to { 0, 0 } in px
 */
const dist = ({ x, y }) => {
  if (isNaN(x) || isNaN(y)) {
    throw new Error('.dist({x: number, y: number}) required')
  }
  return Math.sqrt(x * x + y * y)
}

/**
 * @param { x, y } point - an { x, y } coordinate in pixels
 * @param { unitX, unitY } unitCirclePoint - takes normalized coordinates of unit circle {[0-1], [0-1]}
 * @returns rotatedPoint
 */
const rotate = ({ x, y }, { unitX, unitY }) => ({
  x : x * unitY + y * unitX,
  y : y * unitY - x * unitX
})

/**
 * @param { x, y } point - an { x, y } coordinate in pixels
 * @param { transX, transY } translation- an { x, y } coordinate in pixels
 * @returns translatedPoint
 */
const translate = ({ x, y }, { transX, transY }) => ({
  x : x + transX,
  y : y + transY
})

/**
 * @param {number} percent - a percentage [0-100]
 * @returns radiansFromPercent
 */
const percentToRad = v => (v / 100) * 2 * Math.PI

export default {
  dist,
  translate,
  rotate,
  percentToRad
}
