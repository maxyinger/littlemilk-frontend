import React, { Component } from 'react'
import {
  value,
  tween,
  pointer,
  everyFrame,
  physics,
  listen,
  easing
} from 'popmotion'
import { circle, triangle } from './CursorUtils'
import PropTypes from 'prop-types'
import './Cursor.scss'

/**
 * TODO: Disable mouse down transition when canDrag off
 * TODO: Add constrain motion when app is sticky
 * TODO: Page transition
 * TODO: Migrate utility functions out of class and test them
 * TODO: Migrate globals to config
 */

const DOWN_RADIUS = 15
const DOWN_TRIANGLE_OFFSET = 5
const TRIANGLE_SIZE = 3
const DEFAULT_TRIANGLE_OFFSET = 30
const DEFAULT_RADIUS = 30

class CursorComponent extends Component {
  constructor (props) {
    super(props)
    this.canvas = React.createRef()
  }

  componentDidMount () {
    /** Attach getters|setters */
    this.position = value({ x: event.clientX, y: event.clientY })
    this.stroke = value({ start: 0, end: 100 })
    this.radius = value(DEFAULT_RADIUS)
    this.upDownOffset = value(DEFAULT_TRIANGLE_OFFSET)
    this.upDownOpacity = value(0)
    this.rgb = value({ r: 0, g: 0, b: 0 })

    /** Set Canvas */
    const context = this.canvas.current.getContext('2d')
    this.size(context)

    /** Attach event listeners */
    this.animationLoop = everyFrame().start(() => this.cursor(context))
    this.trackingPhysics = this.startTrackingPhysics()
    this.pointerTracker = this.startTracking(this.trackingPhysics)
    this.resize = listen(window, 'resize').start(() => this.size(context))
    this.mouseDown = listen(document, 'mousedown').start(() =>
      this.isDraggingTween()
    )
    this.mouseUp = listen(document, 'mouseup').start(() =>
      this.isNotDraggingTween()
    )
  }

  componentWillUnmount () {
    /** Detach event listeners */
    this.animationLoop.stop()
    this.trackingPhysics.stop()
    this.pointerTracker.stop()
    this.resize.stop()
    this.mouseDown.stop()
    this.mouseUp.stop()
  }

  isDraggingTween = () => {
    return tween({
      from: [
        this.radius.get(),
        this.upDownOffset.get(),
        this.upDownOpacity.get()
      ],
      to   : [DOWN_RADIUS, DOWN_TRIANGLE_OFFSET, 1],
      ease : easing.backOut
    }).start(v => {
      this.radius.update(v[0])
      this.upDownOffset.update(v[1])
      this.upDownOpacity.update(v[2])
    })
  }

  isNotDraggingTween = () => {
    tween({
      from: [
        this.radius.get(),
        this.upDownOffset.get(),
        this.upDownOpacity.get()
      ],
      to       : [DEFAULT_RADIUS, DEFAULT_TRIANGLE_OFFSET, 0],
      ease     : easing.circOut,
      duration : 500
    }).start(v => {
      this.radius.update(v[0])
      this.upDownOffset.update(v[1])
      this.upDownOpacity.update(v[2])
    })
  }

  startTrackingPhysics = () => {
    return physics({
      velocity       : this.position.getVelocity(),
      friction       : 0.85,
      springStrength : 150,
      to             : this.position.get(),
      restSpeed      : false
    }).start(this.position)
  }

  startTracking = physics => {
    return pointer(this.position.get()).start(v => physics.setSpringTarget(v))
  }

  size = context => {
    /**
     * Set Height and Width of canvas and establish context.
     * Height and Width doubled to display properly on retina
     * */
    const { current } = this.canvas
    current.height = 2 * window.innerHeight
    current.width = 2 * window.innerWidth
    context.scale(2, 2)
  }

  cursor = context => {
    context.clearRect(0, 0, 2 * window.innerWidth, 2 * window.innerHeight)
    /** Draw circle */
    circle(context, {
      x      : this.position.get().x,
      y      : this.position.get().y,
      r      : this.radius.get(),
      rgb    : this.rgb.get(),
      stroke : this.stroke.get()
    })
    /** Draw up triangle */
    const yUpPos =
      this.position.get().y - this.radius.get() - this.upDownOffset.get()
    triangle(context, {
      x        : this.position.get().x,
      y        : yUpPos,
      rgb      : this.rgb.get(),
      opacity  : this.upDownOpacity.get(),
      size     : TRIANGLE_SIZE,
      rotation : 0
    })
    /** Draw down triangle */
    const yDownPos =
      this.position.get().y + this.radius.get() + this.upDownOffset.get()
    triangle(context, {
      x        : this.position.get().x,
      y        : yDownPos,
      rgb      : this.rgb.get(),
      opacity  : this.upDownOpacity.get(),
      size     : TRIANGLE_SIZE,
      rotation : 180
    })
  }

  render () {
    return <canvas className="cursor" ref={this.canvas} />
  }
}

// CursorComponent.propTypes = {
//   canDrag: PropTypes.bool.isRequired
// }

export default CursorComponent
