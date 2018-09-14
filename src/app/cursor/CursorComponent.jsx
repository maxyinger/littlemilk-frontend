import React, { Component } from 'react'
import {
  value,
  tween,
  pointer,
  everyFrame,
  listen,
  easing,
  transform
} from 'popmotion'
import { circle, triangle } from './Cursor.utils'
import config from './Cursor.config'
import physics from '../common/physics'
import CursorStyles from './CursorStyles'
import { makeTween, makeSticky } from './CursorModel'
import { stopActions, stopAction } from '../../utils/actionHelpers'
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
     * Values
     */
    this.position = value({
      x : (window.innerWidth / 7) * 6,
      y : (window.innerHeight / 7) * 5 + config.default.radius * 2
    })
    this.styles = value(CursorStyles.normal)

    /**
     * Prepare Canvas
     */
    const context = this.canvas.current.getContext('2d')
    this.size(context)

    /**
     * Set Actions
     */
    this.actions = {
      /** Draws Values to canvas */
      animationLoop : everyFrame().start(() => this.cursor(context)),
      /** Animate Values */
      physics       : physics(this.position),
      /** Client Listeners */
      resize        : listen(window, 'resize').start(() => this.size(context)),
      pointer       : {},
      mouseDown     : listen(document, 'mousedown').start(this.handleMouseDown),
      mouseUp       : listen(document, 'mouseup').start(this.handleMouseUp)
    }
    this.setPointerListener(false)
  }

  componentWillUnmount () {
    stopActions(this.actions)
  }

  componentDidUpdate () {
    const { x, y } = this.props.stickyPoint
    const isSticky = x !== null || y !== null
    this.setPointerListener(isSticky)
    if (isSticky) {
      makeTween(this.styles.get(), CursorStyles.sticky).start(this.styles)
    } else {
      makeTween(this.styles.get(), CursorStyles.normal).start(this.styles)
    }
  }

  setPointerListener = isSticky => {
    stopAction(this.actions.pointer)
    let pointerListener = pointer()
    if (isSticky) {
      pointerListener = pointer().pipe(
        makeSticky(this.props.stickyPoint, config.stickySpringStrength)
      )
    }
    this.actions.pointer = pointerListener.start(
      this.actions.physics.setSpringTarget
    )
  }

  handleMouseDown = () => {
    if (this.props.canDrag) {
      makeTween(this.styles.get(), CursorStyles.drag).start(this.styles)
    }
  }

  handleMouseUp = () => {
    makeTween(this.styles.get(), CursorStyles.normal).start(this.styles)
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
      x           : this.position.get().x,
      y           : this.position.get().y,
      r           : this.styles.get().radius,
      // rgb         : this.styles.get().rgb,
      rgb         : { r: 51, g: 51, b: 49 },
      strokeStart : this.styles.get().strokeStart,
      strokeEnd   : this.styles.get().strokeEnd
    })

    /** Draw up triangle */
    const yUpPos =
      this.position.get().y -
      this.styles.get().radius -
      this.styles.get().arrowOffset
    triangle(context, {
      x        : this.position.get().x,
      y        : yUpPos,
      // rgb      : this.styles.get().rgb,
      rgb      : { r: 51, g: 51, b: 49 },
      opacity  : this.styles.get().arrowOpacity,
      size     : config.static.arrowSize,
      rotation : 0
    })

    /** Draw down triangle */
    const yDownPos =
      this.position.get().y +
      this.styles.get().radius +
      this.styles.get().arrowOffset
    triangle(context, {
      x        : this.position.get().x,
      y        : yDownPos,
      // rgb      : this.styles.get().rgb,
      rgb      : { r: 51, g: 51, b: 49 },
      opacity  : this.styles.get().arrowOpacity,
      size     : config.static.arrowSize,
      rotation : 180
    })
  }

  render () {
    return <canvas className="cursor" ref={this.canvas} />
  }
}

CursorComponent.propTypes = {
  canDrag     : PropTypes.bool.isRequired,
  stickyPoint : PropTypes.shape({
    x : PropTypes.number,
    y : PropTypes.number
  }).isRequired
}

export default CursorComponent
