import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { stopActions } from '../../utils/actionHelpers'
import { listen } from 'popmotion'
import RollerContainer from './RollerContainer'
import SectionsContainer from './SectionsContainer'
import MenuContainer from './MenuContainer'
import './Home.scss'

class HomeComponent extends Component {
  componentDidMount () {
    // Initial actions.
    this.actions = {
      constant: {
        mouseDown: listen(document, 'mousedown touchstart').start(
          () => (this.props.isDraggable ? this.props.startDragging() : null)
        ),
        mouseUp: listen(document, 'mouseup touchend').start(() => {
          const { endDragging, isDragging } = this.props
          if (isDragging) {
            endDragging()
          }
        })
      },
      scroll: undefined
    }
  }

  shouldComponentUpdate () {
    return false
  }

  componentWillUnmount () {
    stopActions(this.actions)
  }

  render () {
    return (
      <div className="h">
        <div className="h-menu-wrap">
          <MenuContainer />
        </div>
        <div className="h-roller-wrap">
          <RollerContainer />
        </div>
        <div className="h-sections-wrap">
          <SectionsContainer />
        </div>
      </div>
    )
  }
}

HomeComponent.propTypes = {
  /** State derived state */
  isDraggable   : PropTypes.bool.isRequired,
  isDragging    : PropTypes.bool.isRequired,
  /** State derived functions */
  /** Dispatch */
  startDragging : PropTypes.func.isRequired,
  endDragging   : PropTypes.func.isRequired
}

export default HomeComponent
