import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { value, physics } from 'popmotion'
import { MenuController, MenuItemInner } from './MenuPose'

class MenuComponent extends Component {
  constructor (props) {
    super(props)

    this.list = React.createRef()
  }

  componentDidMount () {
    const { scrollToTransform, scrollPercent } = this.props

    // Initial values.
    this.values = {
      transformPercent: value(
        scrollToTransform(scrollPercent),
        scrollPercent => {
          const list = this.list.current
          const transform = scrollToTransform(scrollPercent)
          if (list && transform) {
            list.style.transform = `translate3d(0px, ${transform}%, 0px)`
          }
        }
      )
    }

    /**
     * Needed to update transform of list initially.
     */
    this.values.transformPercent.update(scrollPercent)

    // Initial actions.
    this.actions = {
      physics: physics({
        from           : this.values.transformPercent.get(),
        friction       : 0.98,
        springStrength : 100,
        restSpeed      : false
      }).start(this.values.transformPercent)
    }
  }

  componentDidUpdate () {
    this.actions.physics.setSpringTarget(this.props.scrollPercent)
  }

  render () {
    const { projects, currentProjectIndex, isDragging } = this.props
    return (
      <MenuController
        pose={isDragging ? 'active' : 'inActive'}
        className="h-menu"
      >
        {'Height'}
        <ul ref={this.list} className="h-menu-list">
          {projects.map((project, i) => (
            <li
              key={project.title}
              className={
                (currentProjectIndex === i ? 'active ' : ' ') + 'h-menu-item '
              }
            >
              <div className="h-menu-title oh">
                <MenuItemInner>{project.title}</MenuItemInner>
              </div>
            </li>
          ))}
        </ul>
      </MenuController>
    )
  }
}

MenuComponent.propTypes = {
  scrollPercent       : PropTypes.number.isRequired,
  scrollToTransform   : PropTypes.func.isRequired,
  isDragging          : PropTypes.bool.isRequired,
  currentProjectIndex : PropTypes.number.isRequired,
  projects            : PropTypes.arrayOf(PropTypes.object).isRequired
}

export default MenuComponent
