import React from 'react'
import StickyComponent from './StickyComponent'
import PropTypes from 'prop-types'
import './Nav.scss'

const NavComponent = ({ makeSticky, breakSticky, sticky }) => (
  <nav className="nav">
    <div className="nav-link-wrap">
      <StickyComponent
        exact={true}
        to="/"
        index={0}
        makeSticky={makeSticky}
        breakSticky={breakSticky}
        sticky={sticky}
      >
        home
      </StickyComponent>
    </div>
    <div className="nav-link-wrap">
      <StickyComponent
        exact={false}
        to="/contact"
        index={1}
        makeSticky={makeSticky}
        breakSticky={breakSticky}
        sticky={sticky}
      >
        contact
      </StickyComponent>
    </div>
    <div className="nav-link-wrap">
      <StickyComponent
        exact={false}
        to="/skjdnfkjsdn"
        index={2}
        makeSticky={makeSticky}
        breakSticky={breakSticky}
        sticky={sticky}
      >
        info
      </StickyComponent>
    </div>
  </nav>
)

NavComponent.propTypes = {
  makeSticky  : PropTypes.func.isRequired,
  breakSticky : PropTypes.func.isRequired,
  sticky      : PropTypes.number.isRequired
}

export default NavComponent
