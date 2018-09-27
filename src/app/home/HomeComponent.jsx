import React, { Component } from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'
import { listen, value } from 'popmotion'
import './Home.scss'

class HomeComponent extends Component {
  componentDidMount () {
    // Update app color
    this.props.makeThemeLight()

    // INITIAL_VALUES
    this.values = {
      scrollPercent: value(0, v =>
        this.setState({
          scrollPrecent: v
        })
      )
    }

    // INITIAL_ACTIONS
    this.actions = {
      constants: {
        // mousedown -> dipatch isDragging
        // mouseup -> dispatch !isDragging
      },
      position: {
        pointer: {} // IS_DRAGGING :: {y} -> scrollPercent
      }
    }
    listen(document, 'mousedown touchstart ').start(console.log)
    listen(document, 'mouseup touchend').start(console.log)
  }

  // actionsReducer :: _ -> _
  actionsReducer = () => {}

  render () {
    return (
      <div className="h">
        {/* <HWebGL /> */}
        {/* <pagination/> */}
        {/* sections */}
        {/* <div className="h-article-wrap">
          <article />
          <Surp>Home!</Surp>
        </div> */}
      </div>
    )
  }
}

HomeComponent.propTypes = {
  makeThemeLight : PropTypes.func.isRequired,
  isSticky       : PropTypes.bool.isRequired,
  currentSection : PropTypes.number.isRequired,
  scrollPercent  : PropTypes.number.isRequired
}

export default HomeComponent
