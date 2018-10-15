import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { value, physics } from 'popmotion'
import { MenuController, MenuItemInner } from './MenuPose'

class MenuComponent extends Component {
  constructor (props) {
    super(props)

    this.list = React.createRef()
    this.maskList = React.createRef()
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
      ),

      transformPercent2: value(
        scrollToTransform(scrollPercent),
        scrollPercent => {
          const maskList = this.maskList.current
          const transform = scrollToTransform(scrollPercent)
          if (maskList && transform) {
            maskList.style.transform = `translate3d(0px, ${transform}%, 0px)`
          }
        }
      )
    }

    /**
     * Needed to update transform of list initially.
     */
    this.values.transformPercent.update(scrollPercent)
    this.values.transformPercent2.update(scrollPercent)

    // Initial actions.
    this.actions = {
      physics: physics({
        from           : this.values.transformPercent.get(),
        friction       : 0.98,
        springStrength : 100,
        restSpeed      : false
      }).start(this.values.transformPercent)
      // physics2: physics({
      //   from           : this.values.transformPercent2.get(),
      //   friction       : 0.98,
      //   springStrength : 110,
      //   restSpeed      : false
      // }).start(this.values.transformPercent2)
    }
  }

  componentDidUpdate () {
    this.actions.physics.setSpringTarget(this.props.scrollPercent)
    // this.actions.physics2.setSpringTarget(this.props.scrollPercent)
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

        <div className="h-menu-index oh">
          <MenuItemInner>{currentProjectIndex + 1}.</MenuItemInner>
        </div>
        {/* <div className="h-menu-mask">
          <ul ref={this.maskList} className="h-menu-list">
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
        </div> */}
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
