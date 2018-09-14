import transforms from '../../utils/transforms'

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} config
 */
export const circle = (ctx, { x, y, r, rgb, strokeStart, strokeEnd }) => {
  /**
   * Convert Input
   */
  strokeStart -= 25
  strokeEnd -= 25
  const start = Math.min(strokeStart, strokeEnd)
  const end = Math.max(strokeStart, strokeEnd)
  /**
   * Reset style buffer
   */
  ctx.lineWidth = 1.5
  ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, .6)`
  ctx.fillStyle = 'rgba(0,0,0,0)'
  ctx.beginPath()
  /**
   * Draw  shape
   */
  ctx.arc(x, y, r, transforms.percentToRad(start), transforms.percentToRad(end))
  ctx.stroke()
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} config
 */
export const triangle = (ctx, { x, y, rgb, opacity, size = 5, rotation }) => {
  /** Cant see it don't draw it optimization */
  if (opacity === 0) return
  /**
   * Convert Input
   */
  rotation = rotation % 361
  const rad = rotation * (Math.PI / 180)
  /**
   * Reset style buffer
   */
  ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
  ctx.lineWidth = 0
  ctx.beginPath()
  /**
   * Layout triangle
   */
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
  /**
   * Get unit circle coords
   */
  const unit = {
    unitX : Math.sin(rad),
    unitY : Math.cos(rad)
  }
  /**
   * Rotate X and Y
   */
  const r1 = transforms.rotate(p1, unit)
  const r2 = transforms.rotate(p2, unit)
  const r3 = transforms.rotate(p3, unit)
  /**
   * Translate X and Y
   */
  const trans = {
    transX : x,
    transY : y
  }
  const t1 = transforms.translate(r1, trans)
  const t2 = transforms.translate(r2, trans)
  const t3 = transforms.translate(r3, trans)
  /**
   * Draw Triangle
   */
  ctx.moveTo(t1.x, t1.y)
  ctx.lineTo(t2.x, t2.y)
  ctx.lineTo(t3.x, t3.y)
  ctx.fill()
}
