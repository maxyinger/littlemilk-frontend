import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { physics, value } from 'popmotion'
import { stopActions } from '../../utils/actionHelpers'

/**
 * TODO: Clean up you filthy animal.
 */

class RollerComponent extends Component {
  constructor (props) {
    super(props)
    this.indexList = React.createRef()
    this.titleList = React.createRef()
  }

  titleOpacity = this.props.projects.map((project, i) =>
    this.props.titleIndexToOpacity(i)
  )

  componentDidMount () {
    const { scrollToTransform, scrollPercent } = this.props

    // Initial values.
    this.values = {
      transformPercent: value(
        scrollToTransform(scrollPercent),
        scrollPercent => {
          const indexList = this.indexList.current
          const titleList = this.titleList.current
          const transform = scrollToTransform(scrollPercent)
          if (indexList && titleList && transform) {
            indexList.style.transform = `translate3d(0px, ${transform}%, 0px)`
            titleList.style.transform = `translate3d(0px, ${transform}%, 0px)`
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
        friction       : 0.85,
        springStrength : 150,
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
    const {
      scrollPercent,
      isDragging,
      projects,
      currentProjectIndex
    } = this.props

    return (
      <div className="h-roller">
        {/* needed to set the height through css to
            match height of each .h-roller-title-name */}
        height
        <ul ref={this.indexList} className="h-roller-indexes">
          {projects.map((project, i) => (
            <li key={project.indexName} className="h-roller-index">
              <div className="h-roller-index-number">{project.indexName}</div>
              <div
                className="h-roller-index-name"
                style={
                  {
                    // opacity: this.titleOpacity[i](scrollPercent)
                    // opacity: 0.2
                  }
                }
              >
                {' '}
                {project.title}
              </div>
            </li>
          ))}
        </ul>
        <div className="h-roller-titles-mask">
          <ul ref={this.titleList} className="h-roller-titles">
            {projects.map((project, i) => (
              <li key={project.title} className="h-roller-title">
                <div
                  className="h-roller-title-name"
                  style={
                    {
                      // opacity: this.titleOpacity[i](scrollPercent)
                      // opacity: 0.2
                    }
                  }
                >
                  {project.title}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

RollerComponent.propTypes = {
  scrollPercent       : PropTypes.number.isRequired,
  scrollToTransform   : PropTypes.func.isRequired,
  titleIndexToOpacity : PropTypes.func.isRequired,
  isDragging          : PropTypes.bool.isRequired,
  currentProjectIndex : PropTypes.number.isRequired,
  projects            : PropTypes.arrayOf(PropTypes.object).isRequired
}

export default RollerComponent
