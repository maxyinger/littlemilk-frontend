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
  <header className="nav-wrap">
    <nav className="nav">
      <ul className="nav-links">
        <li className="nav-link-wrap">
          <StickyContainer exact to="/" index={0}>
            <NavLinkInner
              className="nav-link-inner"
              pose={theme === 'light' ? 'themeLight' : 'themeDark'}
            >
              work
            </NavLinkInner>
          </StickyContainer>
        </li>
        <li className="nav-link-wrap">
          <StickyContainer to="/info" index={2}>
            <NavLinkInner
              className="nav-link-inner"
              pose={theme === 'light' ? 'themeLight' : 'themeDark'}
            >
              info
            </NavLinkInner>
          </StickyContainer>
        </li>
      </ul>
    </nav>
    <Link className="logo no-cursor" to="/">
      littlemilk.studio
    </Link>
  </header>
)

NavComponent.propTypes = {
  theme: PropTypes.string.isRequired
}

export default NavComponent
