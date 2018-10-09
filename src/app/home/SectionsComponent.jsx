import React, { Component } from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'
import SplitText from 'react-pose-text'
import SplitLines from '../common/SplitLines'
import { value, physics, easing } from 'popmotion'
import { stopActions } from '../../utils/actionHelpers'

/**
 * TODO: Add dragging posed els
 * TODO: Add enter/exit posed els
 * TODO: Add no cursor hover state for titles
 */

const config = {
  dragDownTime : 200,
  dragUpTime   : 600
}

const HSection = posed.div({
  active: {
    opacity: 1
  },
  inActive: {
    opacity: 0
  }
})

class SectionsComponent extends Component {
  constructor (props) {
    super(props)
    this.sections = React.createRef()
  }

  componentDidMount () {
    const { scrollToTransform, scrollPercent } = this.props

    // Initial values.
    this.values = {
      transformPercent: value(
        scrollToTransform(scrollPercent),
        scrollPercent => {
          const sections = this.sections.current
          const transform = scrollToTransform(scrollPercent)
          if (sections && transform) {
            // sections.style.transform = `translate3d(0px, ${transform}%, 0px)`
          }
        }
      )
    }

    /**
     * Needed to update transform of lists initially.
     */
    this.values.transformPercent.update(scrollPercent)

    // Initial actions.
    this.actions = {
      physics: physics({
        from           : this.values.transformPercent.get(),
        friction       : 0.8,
        springStrength : 130,
        restSpeed      : false
      }).start(this.values.transformPercent)
    }
  }

  componentDidUpdate () {
    this.actions.physics.setSpringTarget(this.props.scrollPercent)
  }

  componentWillUnmount () {
    stopActions(this.actions)
  }

  render () {
    const { projects, isDragging, currentProjectIndex } = this.props
    return (
      <div className="h-sections" ref={this.sections}>
        {projects.map((project, i) => (
          <HSection
            key={project.id}
            className="h-section"
            pose={
              !isDragging && currentProjectIndex === i ? 'active' : 'inActive'
            }
          >
            <div className="h-title-wrap">
              <div className="h-title">
                <div className="h-title-index">001.</div>
                <div className="h-title-mask">
                  <div className="h-title-stream">
                    <span>COGNAK - </span>
                    <span>COGNAK - </span>
                    <span>COGNAK - </span>
                    <span>COGNAK - </span>
                    <span>COGNAK - </span>
                    <span>COGNAK - </span>
                    <span>COGNAK - </span>
                    <span>COGNAK - </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-data-wrap">
              <div className="h-data">
                <div className="h-date">
                  <div className="oh">
                    <div
                      style={{
                        transform: 'translate3d(0, 0%, 0)'
                      }}
                    >
                      July 2018
                    </div>
                  </div>
                </div>
                <ul className="h-roles">
                  {project.roles.map(role => (
                    <li key={role} className="h-role">
                      <div className="oh">{role}</div>
                    </li>
                  ))}
                </ul>
                <div className="h-deliverable">
                  <div className="oh">
                    <div
                      style={{
                        transform: 'translate3d(0, 0%, 0)'
                      }}
                    >
                      Cognak.com
                    </div>
                  </div>
                </div>
                <div className="h-collaborator">
                  <div className="oh">
                    <div
                      style={{
                        transform: 'translate3d(0, 0%, 0)'
                      }}
                    >
                      Collaborated with Cognak
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HSection>
        ))}
      </div>
    )
  }
}

SectionsComponent.propTypes = {
  projects            : PropTypes.arrayOf(PropTypes.object).isRequired,
  scrollPercent       : PropTypes.number.isRequired,
  isDragging          : PropTypes.bool.isRequired,
  currentProjectIndex : PropTypes.number.isRequired,
  scrollToTransform   : PropTypes.func.isRequired
}

export default SectionsComponent
