import React from 'react'
import StickyContainer from './StickyContainer'
import './Nav.scss'

const NavComponent = () => (
  <nav className="nav">
    <div className="nav-link-wrap">
      <StickyContainer exact to="/" index={0}>
        home
      </StickyContainer>
    </div>
    <div className="nav-link-wrap">
      <StickyContainer to="/contact" index={1}>
        contact
      </StickyContainer>
    </div>
    <div className="nav-link-wrap">
      <StickyContainer to="/skjdnfkjsdn" index={2}>
        info
      </StickyContainer>
    </div>
  </nav>
)
export default NavComponent
