import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import StickyNavLink from './StickyNavLink'
import './Nav.scss'

const NavComponent = ({ startSticky, stopSticky }) => (
  <nav className="nav">
    <div className="nav-link-wrap">
      <StickyNavLink
        exact={true}
        to="/"
        startStcky={startSticky}
        stopSticky={stopSticky}
      >
        home
      </StickyNavLink>
    </div>
    <div className="nav-link-wrap">
      <StickyNavLink
        exact={false}
        to="/contact"
        startStcky={startSticky}
        stopSticky={stopSticky}
      >
        contact
      </StickyNavLink>
    </div>
  </nav>
)

// { stickyPoint, stickykey, toggleSticky }

export default NavComponent
