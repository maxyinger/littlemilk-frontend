import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { value, physics } from 'popmotion'
import { stopActions } from '../../utils/actionHelpers'

/**
 * TODO: Add dragging posed els
 * TODO: Add enter/exit posed els
 * TODO: Add no cursor hover state for titles
 */

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
            sections.style.transform = `translate3d(0px, ${transform}%, 0px)`
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
        friction       : 1,
        springStrength : 730,
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
    const { projects } = this.props
    return (
      <div className="h-sections" ref={this.sections}>
        {projects.map(project => (
          <section key={project.id} className="h-section">
            <ul className="h-meta">
              <li className="h-meta-col">
                <div className="h-meta-rule" />
                <div className="h-meta-label">Client</div>
                <div className="h-meta-description">{project.client}</div>
              </li>
              <li className="h-meta-col">
                <div className="h-meta-rule" />
                <div className="h-meta-label">Year</div>
                <div className="h-meta-description">{project.year}</div>
              </li>
              <li className="h-meta-col">
                <div className="h-meta-rule" />
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
                <div className="h-meta-rule" />
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
            </ul>
            <div className="h-title-container">
              <div className="h-title">{project.title}</div>
            </div>
            <div className="h-description-container">{project.description}</div>
          </section>
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
