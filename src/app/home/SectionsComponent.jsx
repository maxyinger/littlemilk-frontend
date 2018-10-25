import React from 'react'
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

const SectionsComponent = ({ projects, isDragging, currentProjectIndex }) => (
  <React.Fragment>
    <div className="h-index oh">
      <CurrentIndexLine pose={!isDragging ? 'active' : 'inActive'}>
        00
        {currentProjectIndex + 1}.
      </CurrentIndexLine>
    </div>
    <div className="h-sections">
      {projects.map((project, i) => (
        <Section
          key={project.id}
          className="h-section"
          isCurrent={currentProjectIndex === i}
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

SectionsComponent.propTypes = {
  projects            : PropTypes.arrayOf(PropTypes.object).isRequired,
  isDragging          : PropTypes.bool.isRequired,
  currentProjectIndex : PropTypes.number.isRequired
}

export default SectionsComponent
