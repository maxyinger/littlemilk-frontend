import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { stopActions } from '../../utils/actionHelpers'
import { listen, pointer } from 'popmotion'
import RollerContainer from './RollerContainer'
import SectionsContainer from './SectionsContainer'
import './Home.scss'

class HomeComponent extends Component {
  componentDidMount () {
    // Update app color.
    this.props.makeThemeLight()

    // Initial values.
    this.origin = undefined

    // Initial actions.
    this.actions = {
      constant: {
        mouseDown: listen(document, 'mousedown touchstart').start(
          () => (this.props.isDraggable ? this.props.startDragging() : null)
        ),
        mouseUp: listen(document, 'mouseup touchend').start(() => {
          const {
            updateScrollPercent,
            scrollPercentOffset,
            stepsScrollPercent,
            endDragging,
            isDragging
          } = this.props
          if (isDragging) {
            const stepedTotalScroll = stepsScrollPercent(scrollPercentOffset)
            updateScrollPercent(stepedTotalScroll)
            /**
             * Needed for the pointer to correctly map
             * scrollPercentOffset on isDragging.
             */
            this.origin = undefined
            return endDragging()
          }
        })
      },
      scroll: undefined
    }
  }

  componentWillUnmount () {
    stopActions(this.actions)
    stopActions(this.values)
  }

  componentDidUpdate (prevProps) {
    if (this.props.isDragging !== prevProps.isDragging) {
      this.actionsReducer(this.props.isDragging)
    }
  }

  // actionsReducer:: bool -> _
  actionsReducer = isDragging => {
    stopActions(this.actions.scroll)
    if (isDragging) {
      this.actions.scroll = pointer().start(({ y }) => {
        /**
         * TODO: make this use constraint morion instead.
         */
        const {
          scrollPercent,
          scrollPercentOffset,
          clampScrollPercentOffset,
          updateScrollPercentOffset
        } = this.props
        if (!this.origin) {
          this.origin = y
        } else {
          const newPercentOffset = (this.origin - y) / window.innerHeight

          // Update drag distance mapping if needed.
          if (newPercentOffset + scrollPercent >= 1) {
            this.origin = y + scrollPercentOffset * window.innerHeight
          } else if (newPercentOffset + scrollPercent <= 0) {
            this.origin = y + scrollPercentOffset * window.innerHeight
          }

          // Prepare before dispatching to store.
          const mappedPercent = newPercentOffset * (100 / 50)
          const clampedPercent = clampScrollPercentOffset(mappedPercent)
          updateScrollPercentOffset(clampedPercent)
          // console.log(`
          //   ScrollPercent: ${this.props.scrollPercent},
          //   ScrollPercentOffset: ${this.props.scrollPercentOffset}
          // `)
        }
      })
    }
  }

  render () {
    return (
      <div className="h">
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
  scrollPercent             : PropTypes.number.isRequired,
  scrollPercentOffset       : PropTypes.number.isRequired,
  isDraggable               : PropTypes.bool.isRequired,
  isDragging                : PropTypes.bool.isRequired,
  currentProject            : PropTypes.number.isRequired,
  projectsWithTags          : PropTypes.arrayOf(PropTypes.object).isRequired,
  projectImageUrls          : PropTypes.arrayOf(PropTypes.string).isRequired,
  /** State derived functions */
  clampScrollPercentOffset  : PropTypes.func.isRequired,
  stepsScrollPercent        : PropTypes.func.isRequired,
  /** Dispatch */
  makeThemeLight            : PropTypes.func.isRequired,
  startDragging             : PropTypes.func.isRequired,
  endDragging               : PropTypes.func.isRequired,
  updateScrollPercent       : PropTypes.func.isRequired,
  updateScrollPercentOffset : PropTypes.func.isRequired
}

export default HomeComponent
