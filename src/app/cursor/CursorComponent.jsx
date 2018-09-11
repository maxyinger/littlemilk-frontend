import React, { Component } from 'react'
import { value, tween, pointer, everyFrame, listen, easing } from 'popmotion'
import { circle, triangle } from './Cursor.utils'
import config from './Cursor.config'
import physics from '../common/physics'
import PropTypes from 'prop-types'
import './Cursor.scss'

/**
 * TODO: Disable mouse down transition when canDrag off
 * TODO: Add constrain motion when app is sticky
 * TODO: Page transition
 * //TODO: Migrate utility functions out of class and test them
 * //TODO: Migrate globals to config
 */

class CursorComponent extends Component {
  constructor (props) {
    super(props)
    this.canvas = React.createRef()
  }

  componentDidMount () {
    /**
     * Attach getters|setters
     */
    this.position = value({ x: event.clientX, y: event.clientY })
    this.stroke = value({ start: 0, end: 100 })
    this.radius = value(config.default.radius)
    this.upDownOffset = value(config.default.arrowOffset)
    this.upDownOpacity = value(0)
    this.rgb = value(config.default.rgb)
    /**
     * Set Canvas
     */
    const context = this.canvas.current.getContext('2d')
    this.size(context)
    /**
     * Attach event listeners
     */
    this.subscribers = [
      (this.animationLoop = everyFrame().start(() => this.cursor(context))),
      (this.physics = physics(this.position)),
      (this.pointer = this.startTracking()),
      (this.resize = listen(window, 'resize').start(() => this.size(context))),
      (this.mouseDown = listen(document, 'mousedown').start(() =>
        this.isDraggingTween()
      )),
      (this.mouseUp = listen(document, 'mouseup').start(() =>
        this.isNotDraggingTween()
      ))
    ]
  }

  componentWillUnmount () {
    /** Detach event listeners */
    this.subscribers.forEach(subscription => subscription.stop())
  }

  isDraggingTween = () => {
    return tween({
      from: [
        this.radius.get(),
        this.upDownOffset.get(),
        this.upDownOpacity.get()
      ],
      to   : [config.drag.radius, config.drag.arrowOffset, 1],
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
      to       : [config.default.radius, config.default.arrowOffset, 0],
      ease     : easing.circOut,
      duration : 500
    }).start(v => {
      this.radius.update(v[0])
      this.upDownOffset.update(v[1])
      this.upDownOpacity.update(v[2])
    })
  }

  startTracking = () => {
    return pointer(this.position.get()).start(v =>
      this.physics.setSpringTarget(v)
    )
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
      size     : config.static.arrowSize,
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
      size     : config.static.arrowSize,
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
CursorComponent.propTypes = {
  canDrag: PropTypes.bool.isRequired
}

export default CursorComponent
