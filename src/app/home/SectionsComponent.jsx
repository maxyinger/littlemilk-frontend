import React, { PureComponent } from 'react'
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

/**
 * TODO: Add no cursor hover state for titles
 */

class SectionsComponent extends PureComponent {
  render () {
    const { projects, isDragging, currentProjectIndex } = this.props
    const project = projects[currentProjectIndex]
    const maxTitleLength = Math.max(
      ...projects.map(project => project.title.length)
    )
    const projectTitleChars = project.title.split('')
    return (
      <React.Fragment>
        <div className="h-index">
          <div className="oh h-index-number">
            <CurrentIndexLine pose={!isDragging ? 'active' : 'inActive'}>
              00
              {currentProjectIndex + 1}.
            </CurrentIndexLine>
          </div>
          <div className="oh">
            <CurrentIndexLine pose={!isDragging ? 'active' : 'inActive'}>
              Drag and explore.
            </CurrentIndexLine>
          </div>
        </div>
        <div className="h-sections">
          <Section
            className="h-section"
            pose={!isDragging ? 'active' : 'inActive'}
          >
            <div className="h-title-wrap">
              <div className="h-title">
                <div className="h-title-mask">
                  <TitleChars className="h-title-stream">
                    {Array(maxTitleLength)
                      .fill(0)
                      .map((_, i) => (
                        <TitleCharWrap key={i} className="oh">
                          <TitleChar>
                            {i < projectTitleChars.length
                              ? projectTitleChars[i]
                              : ''}
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
                    <DataLine>{project.date}</DataLine>
                  </div>
                </div>
                <ul className="h-roles">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <li key={i} className="h-role oh">
                        <DataLine>
                          {i < project.roles.length
                            ? project.roles[i]
                            : undefined}
                        </DataLine>
                      </li>
                    ))}
                </ul>
                <div className="h-deliverable oh">
                  <DataLine>{project.deliverable}</DataLine>
                </div>
                <div className="h-collaborator oh">
                  <DataLine>
                    {project.collaborator
                      ? `Collaborated With ${project.collaborator}`
                      : undefined}
                  </DataLine>
                </div>
                <div className="h-link-wrap oh">
                  <DataLine>
                    <AWrap target="_blank" href={project.url}>
                      Launch
                    </AWrap>
                  </DataLine>
                </div>
              </Data>
            </div>
          </Section>
        </div>
      </React.Fragment>
    )
  }
}

SectionsComponent.propTypes = {
  projects            : PropTypes.arrayOf(PropTypes.object).isRequired,
  isDragging          : PropTypes.bool.isRequired,
  currentProjectIndex : PropTypes.number.isRequired
}

export default SectionsComponent
