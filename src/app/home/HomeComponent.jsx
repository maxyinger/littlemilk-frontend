import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import posed from 'react-pose'

class HomeComponent extends Component {
  componentDidMount () {
    this.props.makeThemeLight()
  }

  render () {
    return (
      <div className="h">
        {/* <hWebGL /> */}
        {/* <indexer /> */}
        <div className="h-article-wrap">
          <article />
          <h1>Home!</h1>
        </div>
      </div>
    )
  }
}

HomeComponent.propTypes = {
  makeThemeLight: PropTypes.func.isRequired
}

export default HomeComponent
