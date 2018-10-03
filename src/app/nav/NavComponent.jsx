import React from 'react'
import StickyContainer from './StickyContainer'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import posed from 'react-pose'
import './Nav.scss'
import AppConfig from '../App.config'

const NavLinkInner = posed.span({
  themeDark: {
    color      : '#ffffff',
    transition : { duration: AppConfig.pageTransitionTime * 0.7 }
  },
  themeLight: {
    color      : '#1c1c1a',
    transition : { duration: AppConfig.pageTransitionTime * 0.7 }
  }
})

const NavComponent = ({ theme }) => (
  <header>
    <nav className="nav">
      <ul className="nav-links">
        <li className="nav-link-wrap">
          <StickyContainer exact to="/" index={0}>
            <NavLinkInner
              className="nav-link-inner"
              pose={theme === 'light' ? 'themeLight' : 'themeDark'}
            >
              Work
            </NavLinkInner>
          </StickyContainer>
        </li>
        <li className="nav-link-wrap">
          <StickyContainer to="/contact" index={1}>
            <NavLinkInner
              className="nav-link-inner"
              pose={theme === 'light' ? 'themeLight' : 'themeDark'}
            >
              Contact
            </NavLinkInner>
          </StickyContainer>
        </li>
        <li className="nav-link-wrap">
          <StickyContainer to="/info" index={2}>
            <NavLinkInner
              className="nav-link-inner"
              pose={theme === 'light' ? 'themeLight' : 'themeDark'}
            >
              Info
            </NavLinkInner>
          </StickyContainer>
        </li>
      </ul>
    </nav>
    <Link className="logo no-cursor" to="/">
      little
      <br />
      milk.
    </Link>
  </header>
)

NavComponent.propTypes = {
  theme: PropTypes.string.isRequired
}

export default NavComponent
