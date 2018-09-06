import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { value, pointer, transform, spring, physics } from 'popmotion'
const { linearSpring, pipe } = transform

const NavLinkInner = styled.span.attrs({
  style: ({ x, y }) => ({
    transform: `translate3d(${x}px, ${y}px, 0px)`
  })
})`
  position: relative;
  display: inline-block;
`

const NavLinkTarget = styled.div`
  position: absolute;
  background-color: tomato;
  height: 500px;
  width: 500px;
  left: 50%;
  top: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
`

const STICKY_NAV_SPRING_STRENGTH = 0.5

class StickyNavLink extends Component {
  constructor (props) {
    super(props)
    this.state = {
      x : 0,
      y : 0
    }
  }

  componentDidMount () {
    /** Getters|Setters */
    this.latchPoint = value({ x: 0, y: 0 }, v => {
      this.setState({
        x : v.x,
        y : v.y
      })
    })

    /** Bind event listeners */
    this.physics = this.latchPhysics()
  }

  componentWillUnmount () {
    // this.pointer.stop()
  }

  latchPhysics = () => {
    return physics({
      velocity       : this.latchPoint.getVelocity(),
      friction       : 0.85,
      springStrength : 150,
      to             : this.latchPoint.get(),
      restSpeed      : false
    }).start(this.latchPoint)
  }

  latch = e => {
    /** Exit if its the active link */
    const parent = e.target.parentElement
    if (parent.classList.contains('active')) return

    console.log('latched')

    /** Find position inside the target */
    const targetBoundingRect = e.target.getBoundingClientRect()
    let x = e.pageX - targetBoundingRect.left
    let y = e.pageY - targetBoundingRect.top
    /** Translate to make {0, 0} at center instead of top left */
    x -= targetBoundingRect.width / 2
    y -= targetBoundingRect.height / 2

    this.pointer = pointer({ x, y })
      .pipe(v => ({
        x : linearSpring(STICKY_NAV_SPRING_STRENGTH, 0)(v.x),
        y : linearSpring(STICKY_NAV_SPRING_STRENGTH, 0)(v.y)
      }))
      .start(v => {
        this.physics.setSpringTarget(v)
      })
  }

  unlatch = e => {
    const parent = e.target.parentElement
    if (parent.classList.contains('active')) return

    console.log('unlatched')

    if (this.pointer) this.pointer.stop()

    spring({
      from     : this.latchPoint.get(),
      velocity : this.latchPoint.getVelocity(),
      to       : { x: 0, y: 0 }
    }).start(this.latchPoint)
  }

  render () {
    // const { x, y } = this.stickyPoint
    const { x, y } = this.state
    return (
      <NavLink
        exact={this.props.exact}
        to={this.props.to}
        className="link"
        activeClassName="active"
      >
        <NavLinkTarget
          className="nav-link-target"
          onMouseEnter={this.latch}
          onMouseLeave={this.unlatch}
        />
        <NavLinkInner x={x} y={y}>
          {this.props.children}
        </NavLinkInner>
      </NavLink>
    )
  }
}

StickyNavLink.propTypes = {
  to       : PropTypes.string.isRequired,
  exact    : PropTypes.bool.isRequired,
  // startSticky : PropTypes.func.isRequired,
  // stopSticky  : PropTypes.func.isRequired,
  children : PropTypes.node.isRequired
}

export default StickyNavLink
