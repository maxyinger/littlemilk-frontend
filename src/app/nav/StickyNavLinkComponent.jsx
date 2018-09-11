import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { value, pointer, listen } from 'popmotion'
import { makeEmitter, makeSticky } from './StickyNavLinkModel'
import physics from '../common/physics'
import { stopActions } from '../../utils/actionHelpers'
import config from './Nav.config'

/**
 * TODO: Add history.push or <Redirect /> routing on mouse down in range
 */

const NavLinkInner = styled.span`
  position: relative;
  display: inline-block;
`

class StickyNavLink extends Component {
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
      pointerListeners: []
    }
    this.setPointerListeners(this.props.sticky === this.props.index)
  }

  componentDidUpdate () {
    this.setPointerListeners(this.props.sticky === this.props.index)
  }

  componentWillUnmount () {
    stopActions(this.actions)
  }

  // setter :: point -> style
  positionSetter = ({ x, y }) => {
    this.target.current.firstElementChild.style.transform = `translate3d(${x}px, ${y}px, 0px)`
  }

  // updatePointerListeners :: bool -> _
  setPointerListeners = isSticky => {
    stopActions(this.actions.pointerListeners)
    this.actions.pointerListeners = [this.Emitter(pointer())]
    // this.actions.physics.setSpringTarget({ x: 0, y: 0 })
    if (isSticky) {
      this.actions.pointerListeners.push(this.Sticky(pointer()))
    } else {
      /** must place at end of execution queue because popmotion uses a
       * debouncer */
      setTimeout(() => this.actions.physics.setSpringTarget({ x: 0, y: 0 }))
    }
  }

  // Emitter :: action -> actionInstance
  Emitter = pointer => {
    const emitter = makeEmitter(
      config.enterDist,
      (config.exitDist / 100) * window.innerWidth,
      this.props.index,
      this.props.sticky,
      this.target.current.getBoundingClientRect()
    )
    return pointer.pipe(emitter).start(v => {
      switch (v) {
        case 'MAKE_STICKY': {
          /** if active cancel emission */
          const target = this.target.current
          if (target.parentElement.classList.contains('active')) return
          /** otherwise emit */
          const rect = target.getBoundingClientRect()
          return this.props.makeSticky(this.props.index, {
            x : rect.left + rect.width / 2,
            y : rect.top + rect.height / 2
          })
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
      this.target.current.getBoundingClientRect(),
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
          <NavLinkInner ref={this.test}>{this.props.children}</NavLinkInner>
        </span>
      </NavLink>
    )
  }
}

StickyNavLink.propTypes = {
  to          : PropTypes.string.isRequired,
  exact       : PropTypes.bool.isRequired,
  index       : PropTypes.number.isRequired,
  makeSticky  : PropTypes.func.isRequired,
  breakSticky : PropTypes.func.isRequired,
  sticky      : PropTypes.number.isRequired,
  children    : PropTypes.node.isRequired
}

export default StickyNavLink
