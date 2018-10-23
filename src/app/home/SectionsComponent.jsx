import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Section,
  DataLine,
  Data,
  TitleChar,
  TitleCharWrap,
  TitleChars,
  CurrentIndexLine
} from './SectionsPose'
import AWrap from '../common/AWrap'
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
      <React.Fragment>
        <div className="h-index oh">
          <CurrentIndexLine
            // initialPose="mount"
            pose={!isDragging ? 'active' : 'inActive'}
          >
            00
            {currentProjectIndex + 1}.
          </CurrentIndexLine>
        </div>
        <div className="h-sections" ref={this.sections}>
          {projects.map((project, i) => (
            <Section
              key={project.id}
              className="h-section"
              isCurrent={currentProjectIndex === i}
              // initialPose="mount"
              pose={
                !isDragging && currentProjectIndex === i ? 'active' : 'inActive'
              }
            >
              <div className="h-title-wrap">
                <div className="h-title">
                  <div className="h-title-mask">
                    <TitleChars className="h-title-stream">
                      {project.title.split('').map((char, j) => (
                        <TitleCharWrap key={j} className="oh">
                          <TitleChar isCurrent={currentProjectIndex === i}>
                            {char}
                          </TitleChar>
                        </TitleCharWrap>
                      ))}
                    </TitleChars>
                  </div>
                </div>
              </div>
              <div className="h-data-wrap">
                <Data className="h-data">
                  <div className="h-date">
                    <div className="oh">
                      <DataLine isCurrent={currentProjectIndex === i}>
                        July 2018
                      </DataLine>
                    </div>
                  </div>
                  <ul className="h-roles">
                    {project.roles.map(role => (
                      <li key={role} className="h-role">
                        <div className="oh">
                          <DataLine isCurrent={currentProjectIndex === i}>
                            {role}
                          </DataLine>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="h-deliverable">
                    <div className="oh">
                      <DataLine isCurrent={currentProjectIndex === i}>
                        Cognak.com
                      </DataLine>
                    </div>
                  </div>
                  <div className="h-collaborator">
                    <div className="oh">
                      <DataLine isCurrent={currentProjectIndex === i}>
                        Collaborated with Cognak
                      </DataLine>
                    </div>
                  </div>
                  <div className="h-link-wrap oh">
                    <DataLine isCurrent={currentProjectIndex === i}>
                      <AWrap target="_blank" href="/">
                        Launch
                      </AWrap>
                    </DataLine>
                  </div>
                </Data>
              </div>
            </Section>
          ))}
        </div>
      </React.Fragment>
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
