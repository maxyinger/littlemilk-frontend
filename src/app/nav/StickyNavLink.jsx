import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { value, pointer, transform, listen } from 'popmotion'
import physics from '../common/physics'
import transforms from '../../utils/transforms'
import config from './Nav.config'
const { linearSpring, conditional } = transform

/**
 * TODO: Target range to viewport instead of pixel unit
 * TODO: Add history.push or <Redirect /> routing on mouse down in range
 * TODO: Migrate utility functions out of class and test them
 * //TODO: Migrate globals to config
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
    /**
     *  Getters|Setters
     */
    this.latchPoint = value({ x: 0, y: 0 }, v => {
      this.setter(v)
    })
    /**
     * Set position subscribers read from
     */
    this.targetPoint = this.size()
    /**
     * Bind event listeners
     */
    this.subscribers = [
      (this.physics = physics.nav(this.latchPoint)),
      (this.emitter = this.startEmmiter()),
      (this.sinkHole = this.startSinkHole()),
      (this.resize = this.startResize())
    ]
  }

  componentWillUnmount () {
    this.subscribers.forEach(subscription => subscription.stop())
  }

  setter = ({ x, y }) => {
    this.target.current.firstElementChild.style.transform = `translate3d(${x}px, ${y}px, 0px)`
  }

  size = () => {
    /**
     * * Establish offset relative to target.
     * * client - offset = dist from target
     */
    const targetRect = this.target.current.getBoundingClientRect()
    return {
      x : targetRect.left + targetRect.width / 2,
      y : targetRect.top + targetRect.height / 2
    }
  }

  mappedPointer = () => {
    return pointer().pipe(v => ({
      x : v.x - this.targetPoint.x,
      y : v.y - this.targetPoint.y
    }))
  }

  startResize = () => {
    return listen(window, 'resize').start(
      () => (this.targetPoint = this.size())
    )
  }

  startEmmiter = () => {
    return this.mappedPointer()
      .pipe(transforms.dist)
      .start(distFromTarget => {
        /** Cant be sticky if active */
        const parent = this.target.current.parentElement
        if (parent.classList.contains('active')) return
        if (
          distFromTarget < config.enterDist &&
          this.props.index !== this.props.sticky
        ) {
          this.props.makeSticky(this.props.index, this.targetPoint)
        }
        if (
          distFromTarget > config.exitDist &&
          this.props.sticky === this.props.index
        ) {
          this.props.breakSticky()
        }
      })
  }

  startSinkHole = () => {
    return this.mappedPointer()
      .pipe(
        conditional(
          () => this.props.index === this.props.sticky,
          v => ({
            x : linearSpring(config.springStrength, 0)(v.x),
            y : linearSpring(config.springStrength, 0)(v.y)
          })
        ),
        conditional(
          () => this.props.index !== this.props.sticky,
          () => ({ x: 0, y: 0 })
        )
      )
      .start(v => {
        this.physics.setSpringTarget(v)
      })
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
          <NavLinkInner ref={this.test} x={0} y={0}>
            {this.props.children}
          </NavLinkInner>
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
