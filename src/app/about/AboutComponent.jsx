import React, { Component } from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'

const Surp = posed.h1({
  mount: {
    color: '#00ff00'
  },
  enter: {
    color      : '#ff0000',
    blook      : () => 1,
    delay      : 2000,
    transition : { duration: 1000 }
  },
  exit: {
    color      : '#0000ff',
    blook      : () => 0,
    transition : { duration: 1000 }
  }
})

class AboutComponent extends Component {
  componentDidMount () {}

  render () {
    return <Surp />
  }
}

AboutComponent.propTypes = {
  makeThemeDark: PropTypes.func.isRequired
}

export default AboutComponent
