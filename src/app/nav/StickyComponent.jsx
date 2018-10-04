import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { value, physics, pointer, listen } from 'popmotion'
import {
  makeEmitterDefault,
  makeEmitterSticky,
  makeSticky,
  boundingBoxCenter
} from './StickyModel'
import types from './duck/types'
import { stopActions } from '../../utils/actionHelpers'
import config from './Nav.config'

/**
 * TODO: add dragging as an actions state.
 */

const NavLinkInner = styled.span`
  position: relative;
  display: inline-block;
  backface-visibility: hidden;
  transform: translate3d(0px, 0px, 0px);
`

class StickyComponent extends Component {
  constructor (props) {
    super(props)
    this.target = React.createRef()
  }

  componentDidMount () {
    // INITIAL_VALUES
    this.values = {
      position: value(
        { x: 0, y: 0 },
        ({ x, y }) =>
          this.target.current
            ? (this.target.current.firstElementChild.style.transform = `translate3d(${x}px, ${y}px, 0px)`)
            : { x, y }
      )
    }

    // INITIAL_ACTIONS
    this.actions = {
      constant: {
        resize: listen(window, 'resize').start(() =>
          this.actionsReducer(this.props.actionsState)
        )
      },
      position: {
        physics : {},
        pointer : {},
        emitter : {},
        click   : {}
      }
    }

    // Initialize actions on mount.
    this.actionsReducer(this.props.actionsState)
  }

  componentWillUnmount () {
    stopActions(this.values)
    stopActions(this.actions)
  }

  componentDidUpdate (prevProps) {
    // Only mutable actions for this class are this.actions.position.
    if (this.props.actionsState !== prevProps.actionsState) {
      this.actionsReducer(this.props.actionsState)
    }
  }

  // actionsReducer :: string -> _
  actionsReducer = type => {
    switch (type) {
      case types.EXIT_TRANSITION: {
        this.actionsExitTransition()
        break
      }
      case types.ENTER_TRANSITION: {
        stopActions(this.actions.position)
        this.props.breakSticky()
        break
      }
      case types.IS_ACTIVE: {
        stopActions(this.actions.position)
        break
      }
      case types.IS_STICKY: {
        this.actionsSticky()
        break
      }
      default: {
        this.actionsDefault()
      }
    }
  }

  // actionsDefault :: _ -> _
  actionsDefault = () => {
    // Stop running actions.
    stopActions(this.actions.position)

    // Set physics to return position to origin.
    this.actions.position.physics = physics({
      from           : this.values.position.get(),
      to             : { x: 0, y: 0 },
      friction       : 0.85,
      springStrength : 250
    }).start(this.values.position)

    const target = this.target.current
    if (target) {
      // Update the emitter.
      const targetCenter = boundingBoxCenter(target.getBoundingClientRect())
      this.actions.position.emitter = pointer()
        .pipe(makeEmitterDefault(targetCenter, config.enterDist))
        .start(
          v =>
            v === types.MAKE_STICKY
              ? this.props.makeSticky(this.props.index, targetCenter)
              : undefined
        )
    } else {
      console.log(
        `Can't compute <sticky index=${this.props.index}/>'s ` +
          'bounding box for default emitter action'
      )
    }
  }

  // actionsSticky :: _ -> _
  actionsSticky = () => {
    // Stop running actions.
    stopActions(this.actions.position)

    // Set physics to go towards computed constraint motion.
    this.actions.position.physics = physics({
      from           : this.values.position.get(),
      friction       : 0.925,
      springStrength : 280,
      restSpeed      : false
    }).start(this.values.position)

    const target = this.target.current
    if (target) {
      const targetCenter = boundingBoxCenter(target.getBoundingClientRect())
      // Compute constraint motion.
      this.actions.position.pointer = pointer()
        .pipe(makeSticky(targetCenter, config.springStrength))
        .start(this.actions.position.physics.setSpringTarget)

      // Update the emitter.
      this.actions.position.emitter = pointer()
        .pipe(makeEmitterSticky(targetCenter, config.exitDist))
        .start(
          v => (v === types.BREAK_STICKY ? this.props.breakSticky() : undefined)
        )
    } else {
      console.log(
        `Can't compute <sticky index=${this.props.index}/>'s ` +
          'bounding box for sticky emitter and pointer actions'
      )
    }

    // Add click handler.
    this.actions.position.click = listen(document, 'click').start(() =>
      this.props.history.push(this.props.to)
    )
  }

  // actionsExitTransition :: _ -> _
  actionsExitTransition = () => {
    // Stop running actions.
    stopActions(this.actions.position)

    // Set physics to return position to origin.
    this.actions.position.physics = physics({
      from           : this.values.position.get(),
      to             : { x: 0, y: 0 },
      friction       : 0.8,
      springStrength : 100
    }).start(this.values.position)
  }

  render () {
    const { actionsState } = this.props
    return (
      <NavLink
        exact={this.props.exact}
        to={this.props.to}
        className="link"
        activeClassName="active"
      >
        <span
          className={
            'target ' + (actionsState === types.IS_STICKY ? 'isSticky ' : '')
          }
          ref={this.target}
        >
          <NavLinkInner>{this.props.children}</NavLinkInner>
        </span>
      </NavLink>
    )
  }
}

StickyComponent.propTypes = {
  /** props for NavLink */
  to           : PropTypes.string.isRequired,
  exact        : PropTypes.bool,
  index        : PropTypes.number.isRequired,
  /** props from store */
  makeSticky   : PropTypes.func.isRequired,
  breakSticky  : PropTypes.func.isRequired,
  actionsState : PropTypes.string.isRequired,
  /** redirect required props from RR4 */
  history      : PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  /** who doesn't love children */
  children: PropTypes.node.isRequired
}

export default withRouter(StickyComponent)
