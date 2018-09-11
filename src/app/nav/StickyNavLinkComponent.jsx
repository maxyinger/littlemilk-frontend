import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { value, pointer, transform, listen } from 'popmotion'
import { makeEmitter, makeSticky } from './StickyNavLinkModel'
import physics from '../common/physics'
import transforms from '../../utils/transforms'
import config from './Nav.config'

/**
 * TODO: Target range to viewport instead of pixel unit
 * TODO: Add history.push or <Redirect /> routing on mouse down in range
 * TODO: reset compositions on componentDidUpdate, & resize
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
    // this.latchPoint = value({ x: 0, y: 0 }, v => {
    //   this.setter(v)
    // })
    // /**
    //  * Set position subscribers read from
    //  */
    // this.targetPoint = this.size()
    // /**
    //  * Bind event listeners
    //  */
    // this.subscribers = [
    //   (this.physics = physics.nav(this.latchPoint)),
    //   (this.emitter = this.startEmitter()),
    //   (this.sinkHole = this.startSinkHole()),
    //   (this.resize = this.startResize())
    // ]

    /**
     * *physics :: actionInstance
     * controls animation
     */
    this.physics = physics(value({ x: 0, y: 0 }, this.setter))
    /** Client listeners */
    this.resize = listen(window, 'resize').start()
    this.emitter = this.Emitter(pointer())
    this.sticky = null
  }

  // Emitter :: action -> actionInstance
  Emitter = pointer => {
    const emitter = makeEmitter(
      config.enterDist,
      config.exitDist,
      this.props.index,
      this.props.sticky,
      this.target.current.getBoundingClientRect()
    )
    return pointer.pipe(emitter).start(v => {
      switch (v) {
        case 'MAKE_STICKY': {
          // TODO: make targetCenter in model
          console.log(v)
          return this.props.makeSticky(this.props.index, {} /* targetCenter */)
        }

        case 'BREAK_STICKY': {
          console.log(v)
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
    return pointer.pipe(sticky).start(this.physics.setSpringTarget)
  }

  // componentWillUnmount () {
  //   this.subscribers.forEach(
  //     subscription => (subscription.stop ? subscription.stop() : null)
  //   )
  // }

  // setter :: point -> style
  setter = ({ x, y }) => {
    this.target.current.firstElementChild.style.transform = `translate3d(${x}px, ${y}px, 0px)`
  }

  // /**
  //  *  size :: _ -> targetCenter
  //  */
  // size = () => {
  //   /**
  //    * * Establish offset relative to target.
  //    * * client - offset = dist from target
  //    */
  //   const targetRect = this.target.current.getBoundingClientRect()
  //   return {
  //     x : targetRect.left + targetRect.width / 2,
  //     y : targetRect.top + targetRect.height / 2
  //   }
  // }

  // /**
  //  *  mappedPointer :: MouseMove -> MappedMouse
  //  */
  // mappedPointer = () => {
  //   return pointer().pipe(v => ({
  //     x : v.x - this.targetPoint.x,
  //     y : v.y - this.targetPoint.y
  //   }))
  // }

  // /**
  //  *  startResize :: resize -> setSize
  //  */
  // startResize = () => {
  //   return listen(window, 'resize').start(
  //     () => (this.targetPoint = this.size())
  //   )
  // }

  // /**
  //  *  startEmmiter :: mappedMouse -> dispatch
  //  */
  // startEmitter = () => {
  //   return this.mappedPointer()
  //     .pipe(transforms.dist)
  //     .start(distFromTarget => {
  //       /** Cant be sticky if active */
  //       const parent = this.target.current.parentElement
  //       if (parent.classList.contains('active')) return
  //       /** Mouse move on first enter */
  //       if (
  //         distFromTarget < config.enterDist &&
  //         this.props.index !== this.props.sticky
  //       ) {
  //         this.props.makeSticky(this.props.index, this.targetPoint)
  //       }
  //       /** Mouse move on first exit */
  //       if (
  //         distFromTarget > config.exitDist &&
  //         this.props.sticky === this.props.index
  //       ) {
  //         this.props.breakSticky()
  //       }
  //     })
  // }

  // /**
  //  * startSinkHole :: mappedMouse, stickyIndex -> constraintMotion
  //  */
  // startSinkHole = () => {
  //   return this.mappedPointer()
  //     .pipe(
  //       /** This StickyNavLink is Sticky */
  //       conditional(
  //         () => this.props.index === this.props.sticky,
  //         v => ({
  //           x : linearSpring(config.springStrength, 0)(v.x),
  //           y : linearSpring(config.springStrength, 0)(v.y)
  //         })
  //       ),
  //       /** This StickyNavLink is not Sticky */
  //       conditional(
  //         () => this.props.index !== this.props.sticky,
  //         () => ({ x: 0, y: 0 })
  //       )
  //     )
  //     .start(v => {
  //       this.physics.setSpringTarget(v)
  //     })
  // }

  render () {
    if (this.props.sticky === this.props.index) {
      console.log(this.sticky)
      this.sticky = this.Sticky(pointer())
    }

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
