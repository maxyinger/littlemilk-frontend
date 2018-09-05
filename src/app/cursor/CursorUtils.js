/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} config
 */
export const circle = (ctx, { x, y, r, rgb, stroke }) => {
  /** Convert Input */
  stroke.start %= 101
  stroke.end %= 101
  const start = Math.min(stroke.start, stroke.end)
  const end = Math.max(stroke.start, stroke.end)
  /** Reset style buffer */
  ctx.lineWidth = 1
  ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`
  ctx.fillStyle = 'rgba(0,0,0,0)'
  ctx.beginPath()
  /** Draw  shape */
  ctx.arc(x, y, r, percentToRad(start), percentToRad(end))
  ctx.stroke()
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} config
 */
export const triangle = (ctx, { x, y, rgb, opacity, size = 5, rotation }) => {
  /** Cant see it donyt draw it optimization */
  if (opacity === 0) return
  /** Convert Input */
  rotation = rotation % 361
  const rad = rotation * (Math.PI / 180)
  /** Reset style buffer */
  ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
  ctx.lineWidth = 0
  ctx.beginPath()
  /** Layout triangle */
  const p1 = {
    x : 0,
    y : 0 - size
  }
  const p2 = {
    x : 0 + size,
    y : 0
  }
  const p3 = {
    x : 0 - size,
    y : 0
  }
  /** Get unit circle coords */
  const unit = {
    unitX : Math.sin(rad),
    unitY : Math.cos(rad)
  }
  /** Rotate X and Y */
  const r1 = rotateP(p1, unit)
  const r2 = rotateP(p2, unit)
  const r3 = rotateP(p3, unit)
  /** Translate X and Y */
  const trans = {
    transX : x,
    transY : y
  }
  const t1 = translateP(r1, trans)
  const t2 = translateP(r2, trans)
  const t3 = translateP(r3, trans)
  /** Draw Triangle */
  ctx.moveTo(t1.x, t1.y)
  ctx.lineTo(t2.x, t2.y)
  ctx.lineTo(t3.x, t3.y)
  ctx.fill()
}

/**
 * * Helpers
 */

const rotateP = ({ x, y }, { unitX, unitY }) => ({
  x : x * unitY + y * unitX,
  y : y * unitY - x * unitX
})

const translateP = ({ x, y }, { transX, transY }) => ({
  x : x + transX,
  y : y + transY
})

const percentToRad = v => (v / 100) * 2 * Math.PI
