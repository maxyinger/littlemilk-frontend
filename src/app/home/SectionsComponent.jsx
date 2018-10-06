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

const Meta = posed.ul({
  active: {
    scale           : 1,
    staggerChildren : 100,
    beforeChildren  : true
  }
})

const Rule = posed.div({
  active: {
    scaleX          : 1,
    transformOrigin : '0% 50%',
    transition      : {
      ease     : easing.reversed(easing.createExpoIn(4)),
      duration : config.dragUpTime
    },
    applyAtStart: {
      transformOrigin: '0% 50%'
    },
    applyAtEnd: {
      transformOrigin: '100% 50%'
    }
  },
  inActive: {
    scaleX          : 0,
    transformOrigin : '100% 50%',
    transition      : {
      ease     : easing.reversed(easing.createExpoIn(4)),
      duration : config.dragDownTime
    },
    applyAtStart: {
      transformOrigin: '100% 50%'
    }
  }
})
const CharStagger = posed.div({
  active: {
    staggerChildren : 15,
    beforeChildren  : true,
    scale           : 1
  }
})

const titlePoses = {
  active: {
    translateY : '0%',
    scaleY     : 1,
    scaleX     : 1,
    transition : {
      ease     : easing.reversed(easing.createExpoIn(4)),
      duration : config.dragUpTime
    },
    applyAtStart: {
      translateY : '250%',
      scaleY     : 1.5,
      scaleX     : 0.666
    }
  },
  inActive: {
    translateY : '-150%',
    transition : {
      ease     : easing.reversed(easing.createExpoIn(4)),
      duration : config.dragDownTime
    }
  }
}

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
            <Meta className="h-meta">
              <li className="h-meta-col">
                <Rule className="h-meta-rule" />
                <div className="h-meta-label">Client</div>
                <div className="h-meta-description">{project.client}</div>
              </li>
              <li className="h-meta-col">
                <Rule className="h-meta-rule" />
                <div className="h-meta-label">Year</div>
                <div className="h-meta-description">{project.year}</div>
              </li>
              <li className="h-meta-col">
                <Rule className="h-meta-rule" />
                <div className="h-meta-label">Collaborators</div>
                <div className="h-meta-description">
                  <ul>
                    {project.collaborators.length > 0 ? (
                      project.collaborators.map(collaborator => (
                        <li key={collaborator}>{collaborator}</li>
                      ))
                    ) : (
                      <li>NA</li>
                    )}
                  </ul>
                </div>
              </li>
              <li className="h-meta-col">
                <Rule className="h-meta-rule" />
                <div className="h-meta-label">Role</div>
                <div className="h-meta-description">
                  <ul>
                    {project.roles.length > 0 ? (
                      project.roles.map(role => <li key={role}>{role}</li>)
                    ) : (
                      <li>NA</li>
                    )}
                  </ul>
                </div>
              </li>
            </Meta>
            <div className="h-title-container">
              <h1 className="h-title">
                <CharStagger>
                  <SplitText charPoses={titlePoses}>{project.title}</SplitText>
                </CharStagger>
              </h1>
            </div>
            <div className="h-description-container">
              <SplitLines>{project.description}</SplitLines>
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
