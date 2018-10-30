import React, { PureComponent } from 'react'
import {
  value,
  tween,
  pointer,
  everyFrame,
  listen,
  physics,
  delay
} from 'popmotion'
import { circle, triangle } from './CursorUtils'
import config from './Cursor.config'
import CursorStyles from './CursorStyles'
import { makeSticky, themeToColor } from './CursorModel'
import { stopActions } from '../../utils/actionHelpers'
import types from './duck/types'
import AppConfig from '../App.config'
import PropTypes from 'prop-types'
import Ease from '../common/Ease'
import './Cursor.scss'

/**
 * TODO: add dragging as an appearance & position
 * actions state (increase friction on physics).
 */

class CursorComponent extends PureComponent {
  constructor (props) {
    super(props)
    this.canvas = React.createRef()
  }

  componentDidMount () {
    // Initial values.
    this.values = {
      // Position values.
      position: value({
        x : (window.innerWidth / 7) * 6,
        y : (window.innerHeight / 7) * 5 + config.default.radius * 2
      }),
      // Appearance values.
      styles: value({
        ...CursorStyles.normal,
        ...CursorStyles.initial
      }),
      color: themeToColor(this.props.theme)
    }

    // Prepare the canvas.
    const context = this.canvas.current.getContext('2d')
    this.size(context)

    // Initial actions.
    this.actions = {
      constant: {
        animationLoop : everyFrame().start(() => this.cursor(context)),
        resize        : listen(window, 'resize').start(() => this.size(context)),
        physics       : physics({
          from           : this.values.position.get(),
          to             : this.values.position.get(),
          friction       : 0.85,
          springStrength : 150,
          restSpeed      : false
        }).start(this.values.position)
      },
      position: {
        tween   : {},
        physics : {},
        pointer : {} // If the animater is physics, this supplies the target.
      },
      appearance: {
        tween     : {}, // Current Tween for styles.
        mouseDown : {}, // Only needed for DEFAULT state.
        mouseUp   : {} // Only needed for DEFAULT state.
      }
    }

    // Initialize actions on mount.
    this.values.position.update({
      x : (window.innerWidth / 7) * 6,
      y : (window.innerHeight / 7) * 5 + config.default.radius * 2
    })
    this.appearanceActionsReducer(this.props.actionsState.appearance)
    this.positionActionsReducer(this.props.actionsState.position)
  }

  componentDidUpdate (prevProps) {
    // Checks to update only relevant actions.
    const { appearance, position } = this.props.actionsState
    if (appearance !== prevProps.actionsState.appearance) {
      this.appearanceActionsReducer(appearance)
    }
    if (position !== prevProps.actionsState.position) {
      this.positionActionsReducer(position)
    }
    if (this.props.theme !== prevProps.theme) {
      tween({
        from     : this.values.color,
        to       : themeToColor(this.props.theme),
        duration : AppConfig.pageTransitionTime * 2
      }).start(v => (this.values.color = v))
    }
  }

  componentWillUnmount () {
    stopActions(this.values)
    stopActions(this.actions)
  }

  // positionActionsReducer :: string -> _
  positionActionsReducer = type => {
    switch (type) {
      case types.EXIT_TRANSITION: {
        this.positionActionsExitTransition()
        return
      }
      case types.ENTER_TRANSITION: {
        this.positionActionsEnterTransition()
        return
      }
      case types.IS_STICKY: {
        this.positionActionsSticky()
        return
      }
      case types.IS_DRAGGING: {
        this.positionActionsDragging()
        return
      }
      default: {
        this.positionActionsDefault()
      }
    }
  }

  // positionActionsDefault :: _ -> _
  positionActionsDefault = () => {
    // Stop running actions.
    stopActions(this.actions.position)

    // Start default actions.
    this.actions.position.physics = physics({
      from           : this.values.position.get(),
      friction       : 0.94,
      springStrength : 140,
      restSpeed      : false
    }).start(this.values.position)
    this.actions.position.pointer = pointer().start(
      this.actions.position.physics.setSpringTarget
    )
  }

  // positionActionsDragging :: _ -> _
  positionActionsDragging = () => {
    // Stop actions.
    stopActions(this.actions.position)

    // Start dragging actions.
    this.actions.position.physics = physics({
      from           : this.values.position.get(),
      friction       : 0.99,
      springStrength : 100,
      restSpeed      : false
    }).start(this.values.position)
    this.actions.position.pointer = pointer().start(
      this.actions.position.physics.setSpringTarget
    )
  }

  // positionActionsSticky :: _ -> _
  positionActionsSticky = () => {
    // Stop running actions.
    stopActions(this.actions.position)

    // Start sticky actions.
    this.actions.position.physics = physics({
      from           : this.values.position.get(),
      friction       : 0.94,
      springStrength : 280,
      restSpeed      : false
    }).start(this.values.position)
    this.actions.position.pointer = pointer()
      .pipe(makeSticky(this.props.stickyPoint, config.stickySpringStrength))
      .start(this.actions.position.physics.setSpringTarget)
  }

  // positionActionsExitTransition :: _ -> _
  positionActionsExitTransition = () => {
    // Stop running actions.
    stopActions(this.actions.position)

    // Start sticky actions.
    this.actions.position.physics = physics({
      from           : this.values.position.get(),
      to             : this.props.stickyPoint,
      friction       : 0.8,
      springStrength : 100
    }).start(this.values.position)
  }

  // positionActionsEnterTransition :: () _ -> _
  positionActionsEnterTransition = () => {
    // Stop running actions.
    stopActions(this.actions.position)

    this.actions.position.pointer = pointer().start(this.values.position)

    this.actions.position.physics = physics({
      from           : this.values.position.get(),
      velocity       : this.values.position.getVelocity(),
      friction       : 0.85,
      springStrength : 150,
      restSpeed      : false
    }).start(this.values.position)
    this.actions.position.pointer = pointer().start(
      this.actions.position.physics.setSpringTarget
    )
  }

  // appearanceActionsReducer :: string -> _
  appearanceActionsReducer = type => {
    switch (type) {
      case types.EXIT_TRANSITION: {
        this.appearanceActionsExitTransition()
        return
      }
      case types.ENTER_TRANSITION: {
        this.appearanceActionsEnterTransition()
        return
      }
      case types.IS_STICKY: {
        this.appearanceActionsSticky()
        return
      }
      case types.NO_CURSOR: {
        this.appearanceActionsNoCursor()
        return
      }
      case types.IS_DRAGGING: {
        this.appearanceActionsDragging()
        return
      }
      default: {
        this.appearanceActionsDefault()
      }
    }
  }

  // appearanceActionsDefault :: _ -> _
  appearanceActionsDefault = () => {
    // Stop current actions.
    stopActions(this.actions.appearance)

    // Apply default appearance tween.
    this.actions.appearance.tween = tween({
      from     : this.values.styles.get(),
      to       : CursorStyles.normal,
      duration : AppConfig.dragTransitionTime,
      ease     : Ease['o4']
    }).start(this.values.styles)
  }

  // appearanceActionsDragging :: _ -> _
  appearanceActionsDragging = () => {
    // Stop current actions.
    stopActions(this.actions.appearance)
    // Apply dragging actions.
    this.actions.appearance.tween = tween({
      from : this.values.styles.get(),
      to   : {
        ...CursorStyles.normal,
        ...CursorStyles.drag
      },
      duration : AppConfig.dragTransitionTime / 2,
      ease     : Ease['o4']
    }).start(this.values.styles)
  }

  // appearanceActionsSticky :: _ -> _
  appearanceActionsSticky = () => {
    // Stop current actions.
    stopActions(this.actions.appearance)
    // Apply sticky actions.
    const currStyles = this.values.styles.get()
    this.actions.appearance.tween = tween({
      from : currStyles,
      to   : {
        ...CursorStyles.normal,
        ...CursorStyles.sticky
      },
      duration: 300
    }).start(this.values.styles)
  }

  // appearanceActionsNoCursor :: _ -> _
  appearanceActionsNoCursor = () => {
    // Stop current actions.
    stopActions(this.actions.appearance)
    // Apply transitioning actions.
    const currStyles = this.values.styles.get()
    this.actions.appearance.tween = tween({
      from : currStyles,
      to   : {
        ...currStyles,
        ...CursorStyles.noCursor
      }
    }).start(this.values.styles)
  }

  // appearanceActionsExitTransition :: _ -> _
  appearanceActionsExitTransition = () => {
    // Stop current actions.
    stopActions(this.actions.appearance)
    // Apply transitioning actions.
    const currStyles = this.values.styles.get()
    this.actions.appearance.tween = tween({
      from : currStyles,
      to   : {
        ...currStyles,
        ...CursorStyles.exitTransition
      },
      duration : AppConfig.pageTransitionTime,
      ease     : Ease['io3']
    }).start(this.values.styles)
  }

  // appearanceActionsEnterTransition:: _ -> _
  appearanceActionsEnterTransition = () => {
    const currStyles = this.values.styles.get()
    delay(AppConfig.pageTransitionTime / 2).start({
      complete: () => {
        this.actions.appearance.tween = tween({
          from: {
            ...currStyles,
            strokeStart : 0,
            strokeEnd   : 0,
            opacity     : 1,
            radius      : 20,
            lineWidth   : 1
          },
          to: {
            ...currStyles,
            ...CursorStyles.enterTransition
          },
          duration : AppConfig.pageTransitionTime * 1.5,
          ease     : Ease['io4']
        }).start(this.values.styles)
      }
    })
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
    // Get Styles & Position
    const {
      radius,
      opacity,
      lineWidth,
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
      lineWidth   : lineWidth,
      opacity     : opacity,
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
  theme: PropTypes.string.isRequired
}

export default CursorComponent
