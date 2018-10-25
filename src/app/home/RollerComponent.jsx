import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { physics, value, pointer } from 'popmotion'
import { RollerTransition } from './RollerPose'
import { stopActions } from '../../utils/actionHelpers'

/**
 * TODO: Clean up you filthy animal.
 */

class RollerComponent extends PureComponent {
  constructor (props) {
    super(props)
    this.indexList = React.createRef()
    this.titleList = React.createRef()
  }

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
        friction       : 0.98,
        springStrength : 150,
        restSpeed      : false
      }).start(this.values.transformPercent),
      pointer: {}
    }
  }

  componentDidUpdate (prevProps) {
    const { isDragging, normalizedDragPipe, scrollPercent } = this.props
    if (prevProps.isDragging !== isDragging && isDragging) {
      this.actions.pointer = pointer({ y: 0 })
        .pipe(
          normalizedDragPipe,
          v => v + scrollPercent
        )
        .start(v => this.actions.physics.setSpringTarget(v))
    }
    if (prevProps.isDragging !== isDragging && !isDragging) {
      stopActions(this.actions.pointer)
    }
    if (!isDragging) {
      this.actions.physics.setSpringTarget(scrollPercent)
    }
  }

  componentWillUnmount () {
    stopActions(this.values)
    stopActions(this.actions)
  }

  render () {
    const { projects } = this.props

    return (
      <div className="h-roller">
        {/* needed to set the height through css to
            match height of each .h-roller-title-name */}
        height
        <ul ref={this.indexList} className="h-roller-indexes">
          {projects.map((project, i) => (
            <li key={project.indexName} className="h-roller-index oh">
              <RollerTransition className="h-roller-index">
                <div className="h-roller-index-number">{project.indexName}</div>
                <div className="h-roller-index-name"> {project.title}</div>
              </RollerTransition>
            </li>
          ))}
        </ul>
        <div className="h-roller-titles-mask">
          <ul ref={this.titleList} className="h-roller-titles">
            {projects.map((project, i) => (
              <li key={project.title} className="h-roller-title oh">
                <RollerTransition>
                  <div className="h-roller-title-number">
                    {project.indexName}
                  </div>
                  <div className="h-roller-title-name">{project.title}</div>
                </RollerTransition>
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
  isDragging          : PropTypes.bool.isRequired,
  currentProjectIndex : PropTypes.number.isRequired,
  projects            : PropTypes.arrayOf(PropTypes.object).isRequired,
  normalizedDragPipe  : PropTypes.func.isRequired
}

export default RollerComponent
