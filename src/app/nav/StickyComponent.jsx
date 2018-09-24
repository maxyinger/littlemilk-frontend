import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { value, pointer, listen } from 'popmotion'
import { makeEmitter, makeSticky, boundingBoxCenter } from './StickyModel'
import physics from '../common/physics'
import { stopActions } from '../../utils/actionHelpers'
import config from './Nav.config'

/**
 * TODO: Add history.push or <Redirect /> routing on mouse down in range
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
    this.actions = {
      /** Controls animation */
      physics: physics(value({ x: 0, y: 0 }, this.positionSetter), {
        friction       : 0.925,
        springStrength : 280
      }),
      /** Client listeners */
      resize: listen(window, 'resize').start(() =>
        this.setPointerListeners(this.props.sticky === this.props.index)
      ),
      pointerListeners : [],
      mouseClick       : listen(window, 'click').start(this.handleMouseClick)
    }
    this.setPointerListeners(this.props.sticky === this.props.index)
  }

  componentDidUpdate () {
    this.setPointerListeners(this.props.sticky === this.props.index)
  }

  componentWillUnmount () {
    stopActions(this.actions)
  }

  // handleMouseClick :: _ => _
  handleMouseClick = () => {
    /**
     * if this is sticky signal transition to app and redirect page change
     */
    if (this.props.sticky === this.props.index) {
      // Set animations in motion
      // stopActions(this.actions.pointerListeners)
      // setTimeout(() => this.actions.physics.setSpringTarget({ x: 0, y: 0 }))
      // this.props.breakSticky()
      // Signal app treansition is occurring and transition state
      // this.props.startTransition()
      this.props.history.push(this.props.to)
    }
  }

  // setter :: point -> style
  positionSetter = ({ x, y }) => {
    if (this.target.current) {
      this.target.current.firstElementChild.style.transform = `translate3d(${x}px, ${y}px, 0px)`
    }
  }

  // updatePointerListeners :: bool -> _
  setPointerListeners = isSticky => {
    stopActions(this.actions.pointerListeners)
    this.actions.pointerListeners = [this.Emitter(pointer())]
    // this.actions.physics.setSpringTarget({ x: 0, y: 0 })
    if (isSticky && !this.props.transitionStarted) {
      this.actions.pointerListeners.push(this.Sticky(pointer()))
    } else {
      /** must place at end of execution queue because popmotion uses a
       * debouncer */
      setTimeout(() => this.actions.physics.setSpringTarget({ x: 0, y: 0 }))
    }
  }

  // Emitter :: action -> actionInstance
  Emitter = pointer => {
    let targetCenter = {}
    if (this.target.current) {
      const clientRect = this.target.current.getBoundingClientRect()
      targetCenter = boundingBoxCenter(clientRect)
    }
    const emitter = makeEmitter(
      config.enterDist,
      (config.exitDist / 100) * window.innerWidth,
      this.props.index,
      this.props.sticky,
      targetCenter
    )
    return pointer.pipe(emitter).start(v => {
      switch (v) {
        case 'MAKE_STICKY': {
          /** if active cancel emission */
          const target = this.target.current
          if (target.parentElement.classList.contains('active')) return
          /** otherwise emit */
          return this.props.makeSticky(this.props.index, targetCenter)
        }

        case 'BREAK_STICKY': {
          return this.props.breakSticky()
        }
      }
    })
  }

  // Sticky :: action -> actionInstance
  Sticky = pointer => {
    const sticky = makeSticky(
      boundingBoxCenter(this.target.current.getBoundingClientRect()),
      config.springStrength
    )
    return pointer.pipe(sticky).start(this.actions.physics.setSpringTarget)
  }

  render () {
    return (
      <NavLink
        exact={this.props.exact}
        to={this.props.to}
        className="link"
        activeClassName="active"
      >
        <span ref={this.target}>
          <NavLinkInner>{this.props.children}</NavLinkInner>
        </span>
      </NavLink>
    )
  }
}

StickyComponent.propTypes = {
  /** props for NavLink */
  to                : PropTypes.string.isRequired,
  exact             : PropTypes.bool,
  index             : PropTypes.number.isRequired,
  /** props from store */
  makeSticky        : PropTypes.func.isRequired,
  breakSticky       : PropTypes.func.isRequired,
  sticky            : PropTypes.number.isRequired,
  transitionStarted : PropTypes.bool.isRequired,
  /** redirect required props from RR4 */
  history           : PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  /** who doesn't love children */
  children: PropTypes.node.isRequired
}

export default withRouter(StickyComponent)
