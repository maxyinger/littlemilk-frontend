import React from 'react'
import StickyContainer from './StickyContainer'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import SplitText from 'react-pose-text'
import './Nav.scss'

const charPoses = {
  themeDark: {
    color: '#ffffff'
  },
  themeLight: {
    color: '#1c1c1a'
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
              home
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
              contact
            </SplitText>
          </StickyContainer>
        </li>
        <li className="nav-link-wrap">
          <StickyContainer to="/skjdnfkjsdn" index={2}>
            <SplitText
              className="nav-link-inner"
              charPoses={charPoses}
              pose={theme === 'light' ? 'themeLight' : 'themeDark'}
            >
              info
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
