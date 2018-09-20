import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import posed from 'react-pose'

class HomeComponent extends Component {
  componentDidMount () {
    this.props.makeThemeDark()
  }

  render () {
    return (
      <div className="h">
        {/* <hWebGL /> */}
        {/* <indexer /> */}
        <div className="h-article-wrap">
          <article />
        </div>
      </div>
    )
  }
}

HomeComponent.propTypes = {
  makeThemeDark: PropTypes.func.isRequired
}

export default HomeComponent
