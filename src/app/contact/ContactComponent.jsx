import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ContactComponent extends Component {
  componentDidMount () {
    this.props.makeThemeDark()
  }

  render () {
    return <h1>Conatct</h1>
  }
}

ContactComponent.propTypes = {
  makeThemeDark: PropTypes.func.isRequired
}

export default ContactComponent
