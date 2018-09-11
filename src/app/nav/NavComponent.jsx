import React from 'react'
import StickyNavLink from './StickyNavLinkComponent'
import PropTypes from 'prop-types'
import './Nav.scss'

const NavComponent = ({ makeSticky, breakSticky, sticky }) => (
  <nav className="nav">
    <div className="nav-link-wrap">
      <StickyNavLink
        exact={true}
        to="/"
        index={0}
        makeSticky={makeSticky}
        breakSticky={breakSticky}
        sticky={sticky}
      >
        home
      </StickyNavLink>
    </div>
    <div className="nav-link-wrap">
      <StickyNavLink
        exact={false}
        to="/contact"
        index={1}
        makeSticky={makeSticky}
        breakSticky={breakSticky}
        sticky={sticky}
      >
        contact
      </StickyNavLink>
    </div>
    <div className="nav-link-wrap">
      <StickyNavLink
        exact={false}
        to="/skjdnfkjsdn"
        index={2}
        makeSticky={makeSticky}
        breakSticky={breakSticky}
        sticky={sticky}
      >
        info
      </StickyNavLink>
    </div>
  </nav>
)

NavComponent.propTypes = {
  makeSticky  : PropTypes.func.isRequired,
  breakSticky : PropTypes.func.isRequired,
  sticky      : PropTypes.number.isRequired
}

export default NavComponent
