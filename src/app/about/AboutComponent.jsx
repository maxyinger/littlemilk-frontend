import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AboutComponent extends Component {
  componentDidMount () {
    this.props.makeThemeDark()
  }

  render () {
    return <h1>Info!</h1>
  }
}

AboutComponent.propTypes = {
  makeThemeDark: PropTypes.func.isRequired
}

export default AboutComponent
