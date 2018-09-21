import React, { Component } from 'react'
import { value, tween, pointer, everyFrame, listen, easing } from 'popmotion'
import { circle, triangle } from './Cursor.utils'
import config from './Cursor.config'
import physics from '../common/physics'
import CursorStyles from './CursorStyles'
import { makeSticky, themeToColor } from './CursorModel'
import { stopActions } from '../../utils/actionHelpers'
import types from './duck/types'
import AppConfig from '../App.config'
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
    // INITIAL_VALUES
    this.values = {
      // position values
      position : {},
      // appearance values
      styles   : value({
        ...CursorStyles.normal,
        ...CursorStyles.initial
      }),
      color                  : themeToColor(this.props.theme),
      positionTransitioned   : false,
      appearanceTransitioned : false
    }

    // Prepare the canvas
    const context = this.canvas.current.getContext('2d')
    this.size(context)

    // INITIAL_ACTIONS
    this.actions = {
      constant: {
        animationLoop : everyFrame().start(() => this.cursor(context)),
        resize        : listen(window, 'resize').start(() => this.size(context))
      },
      position: {
        animater : {}, // tween or physics
        pointer  : {} // if the animater is physics, this supplies the target
      },
      appearance: {
        tween     : {}, // Current Tween for styles
        mouseDown : {}, // Only needed for DEFAULT state
        mouseUp   : {} // Only needed for DEFAULT state
      }
    }

    this.positionActionsReducer(this.props.actionsState.position)
    this.appearanceActionsReducer(this.props.actionsState.appearance)
  }

  componentDidUpdate (prevProps) {
    // checks to update only relevant actions
    const { appearance, position } = this.props.actionsState
    if (position !== prevProps.actionsState.position) {
      this.positionActionsReducer(position)
    }
    if (appearance !== prevProps.actionsState.appearance) {
      this.appearanceActionsReducer(appearance)
    }
  }

  componentWillUnmount () {
    stopActions(this.values)
    stopActions(this.actions)
  }

  // positionActionsReducer :: string -> _
  positionActionsReducer = type => {
    if (this.values.positionTransitioned) {
      switch (type) {
        case types.TRANSITIONING: {
          this.positionActionsTransitioning()
          return
        }
        case types.STICKY: {
          this.positionActionsSticky()
          return
        }
        default: {
          this.positionActionsDefault()
        }
      }
    } else {
      this.positionActionsInit()
    }
  }

  // positionActionsInit :: _ -> _
  positionActionsInit = () => {
    // stop any active actions
    stopActions(this.values.position)
    stopActions(this.actions.position)
    // reset values
    this.values.position = value({
      x : (window.innerWidth / 7) * 6,
      y : (window.innerHeight / 7) * 5 + config.default.radius * 2
    })
    // flag that its loaded so reducer can behave like default
    this.values.positionTransitioned = true
    this.positionActionsReducer(this.props.actionsState.position)
  }

  // positionActionsDefault :: _ -> _
  positionActionsDefault = () => {
    // stop any active actions
    stopActions(this.actions.position)
    // set actions
    this.actions.position.animater = physics(this.values.position)
    this.actions.position.pointer = pointer().start(
      this.actions.position.animater.setSpringTarget
    )
  }

  // positionActionsSticky :: _ -> _
  positionActionsSticky = () => {
    // stop any active actions
    stopActions(this.actions.position)
    // set actions
    this.actions.position.animater = physics(this.values.position, {
      // TODO: move these variables into config.sticky.physics
      friction       : 0.925,
      springStrength : 280
    })
    this.actions.position.pointer = pointer()
      .pipe(makeSticky(this.props.stickyPoint, config.stickySpringStrength))
      .start(this.actions.position.animater.setSpringTarget)
  }

  // positionActionsTransitioning :: _ -> _
  positionActionsTransitioning = () => {
    // stop any active actions
    stopActions(this.actions.position)
    // set actions
    this.actions.animater = tween({
      duration : AppConfig.pageTransitionTime,
      to       : this.props.stickyPoint,
      ease     : easing.circOut
    }).start({
      update   : this.values.position,
      complete : () => this.setState({ positionTransitioned: false })
    })
  }

  // appearanceActionsReducer :: string -> _
  appearanceActionsReducer = type => {
    if (this.values.appearanceTransitioned) {
      switch (type) {
        case types.TRANSITIONING: {
          this.appearanceActionsTransitioning()
          return
        }
        case types.STICKY: {
          this.appearanceActionsSticky()
          return
        }
        case types.NO_CURSOR: {
          this.appearanceActionsNoCursor()
          return
        }
        default: {
          this.appearanceActionsDefault()
        }
      }
    } else {
      this.appearanceActionsInit()
    }
  }

  // appearanceActionsInit :: _-> _
  appearanceActionsInit = () => {
    // stop any active actions
    stopActions(this.actions.appearance)
    // set values
    this.values.color = themeToColor(this.props.theme)
    // animate from load
    this.actions.appearance.tween = tween({
      to       : CursorStyles.normal,
      duration : AppConfig.pageTransitionTime,
      ease     : easing.circOut
    }).start({
      update   : this.values.styles,
      complete : () => {
        this.values.appearanceTransitioned = true
        this.appearanceActionsReducer(this.props.actionsState.appearance)
      }
    })
  }

  // appearanceActionsDefault :: _ -> _
  appearanceActionsDefault = () => {
    // stop any active actions
    stopActions(this.actions.appearance)
    // animate to default appearance
    this.actions.appearance.tween = tween({
      to: CursorStyles.normal
    }).start(this.values.styles)
    // set mouseDown mouse Up actions
    this.actions.mouseDown = listen(document, 'mouseDown').start(() => {
      if (this.props.canDrag) {
        this.actions.appearance.tween = tween({
          to: {
            ...CursorStyles.normal,
            ...CursorStyles.drag
          },
          ease: easing.backOut
        }).start(this.values.styles)
      }
    })
    this.actions.mouseUp = listen(document, 'mouseUp').start(() => {
      if (this.props.canDrag) {
        this.actions.appearance.tween = tween({
          to   : CursorStyles.normal,
          ease : easing.backOut
        }).start(this.values.styles)
      }
    })
  }

  // appearanceActionsSticky :: _ -> _
  appearanceActionsSticky = () => {
    // stop any active actions
    stopActions(this.actions.appearance)
    // animate to default appearance
    this.actions.appearance.tween = tween({
      to: {
        ...CursorStyles.normal,
        ...CursorStyles.sticky
      },
      duration : 800,
      ease     : easing.circOut
    }).start(this.values.styles)
  }

  // appearanceActionsNoCursor :: _ -> _
  appearanceActionsNoCursor = () => {}

  // appearanceActionsTransitioning :: _ -> _
  appearanceActionsTransitioning = () => {}

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
    // Get Styles & Position
    const {
      radius,
      strokeStart,
      strokeEnd,
      arrowOffset,
      arrowOpacity
    } = this.values.styles.get()
    const { x, y } = this.values.position.get()
    // Draw Circle
    circle(context, {
      x           : x,
      y           : y,
      r           : radius,
      rgb         : this.values.color,
      strokeStart : strokeStart,
      strokeEnd   : strokeEnd
    })
    // Draw Up Triangle
    triangle(context, {
      x        : x,
      y        : y - radius - arrowOffset,
      rgb      : this.values.color,
      opacity  : arrowOpacity,
      size     : config.static.arrowSize,
      rotation : 0
    })
    // Draw Down Triangle
    triangle(context, {
      x        : x,
      y        : y + radius + arrowOffset,
      rgb      : this.values.color,
      opacity  : arrowOpacity,
      size     : config.static.arrowSize,
      rotation : 180
    })
  }

  render () {
    return <canvas className="cursor" ref={this.canvas} />
  }
}

CursorComponent.propTypes = {
  actionsState: PropTypes.shape({
    position   : PropTypes.string.isRequired,
    appearance : PropTypes.string.isRequired
  }).isRequired,
  stickyPoint: PropTypes.shape({
    x : PropTypes.number,
    y : PropTypes.number
  }).isRequired,
  canDrag : PropTypes.bool.isRequired,
  theme   : PropTypes.string.isRequired
}

export default CursorComponent
