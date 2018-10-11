import React from 'react'
import PropTypes from 'prop-types'

const AWrap = props => (
  <a className="no-cursor link" {...props}>
    <div className="link-inner">
      <div className="link-child">
        {props.children}
        <div className="link-line">
          <span />
          <span />
        </div>
      </div>
      <div className="arrow">
        <svg viewBox="0 0 19.6 19.6">
          <path d="M0.9,19.6L0,18.7L17.6,1.1L0,1.2V0h19.6v19.6h-1.2L18.5,2L0.9,19.6z" />
        </svg>
      </div>
    </div>
  </a>
)

AWrap.propTypes = {
  children: PropTypes.node.isRequired
}

export default AWrap
