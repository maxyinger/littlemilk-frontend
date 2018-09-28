import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { stopActions } from '../../utils/actionHelpers'
import { listen, pointer } from 'popmotion'
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
            updateScrollPercentOffset,
            scrollPercentOffset,
            stepsScrollPercent,
            endDragging,
            isDragging
          } = this.props
          if (isDragging) {
            // Update scrollPercent.
            const stepedTotalScroll = stepsScrollPercent(scrollPercentOffset)
            updateScrollPercent(stepedTotalScroll)
            // Reset vars for next mouseDown.
            updateScrollPercentOffset(0)
            this.origin = undefined
            // Notify state dragging stopped.
            return endDragging()
          }
        })
      },
      scroll: undefined
    }
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
            this.origin = y
          }

          // Prepare before dispatching to Store
          const mappedPercent = newPercentOffset * (100 / 85)
          const clampedPercent = clampScrollPercentOffset(mappedPercent)
          updateScrollPercentOffset(clampedPercent)
          console.log(`
            ScrollPercent: ${this.props.scrollPercent},
            ScrollPercentOffset: ${this.props.scrollPercentOffset}
          `)
        }
      })
    }
  }

  render () {
    const { scrollPercent, currentProject, scrollPercentOffset } = this.props
    return (
      <div className="h">
        {/* <HWebGL /> */}
        {/* <pagination/> */}
        {/* sections */}
        {/* <div className="h-article-wrap">
          <article />
          <Surp>Home!</Surp>
        </div> */}
        <h1>
          {scrollPercent + scrollPercentOffset} : {currentProject}
        </h1>
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
  projectIndexes            : PropTypes.arrayOf(PropTypes.string).isRequired,
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
