import React from 'react'
import StickyContainer from './StickyContainer'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import SplitText from 'react-pose-text'
import './Nav.scss'
import AppConfig from '../App.config'

const charPoses = {
  themeDark: {
    color      : '#ffffff',
    transition : { duration: AppConfig.pageTransitionTime * 0.7 }
  },
  themeLight: {
    color      : '#1c1c1a',
    transition : { duration: AppConfig.pageTransitionTime * 0.7 }
  }
}

const NavComponent = ({ theme }) => (
  <header>
    <nav className="nav">
      <ul className="nav-links">
        <li className="nav-link-wrap">
          <StickyContainer exact to="/" index={0}>
            <SplitText
              className="nav-link-inner"
              charPoses={charPoses}
              pose={theme === 'light' ? 'themeLight' : 'themeDark'}
            >
              Home
            </SplitText>
          </StickyContainer>
        </li>
        <li className="nav-link-wrap">
          <StickyContainer to="/contact" index={1}>
            <SplitText
              className="nav-link-inner"
              charPoses={charPoses}
              pose={theme === 'light' ? 'themeLight' : 'themeDark'}
            >
              Contact
            </SplitText>
          </StickyContainer>
        </li>
        <li className="nav-link-wrap">
          <StickyContainer to="/info" index={2}>
            <SplitText
              className="nav-link-inner"
              charPoses={charPoses}
              pose={theme === 'light' ? 'themeLight' : 'themeDark'}
            >
              Info
            </SplitText>
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
