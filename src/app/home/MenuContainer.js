import { connect } from 'react-redux'
import { homeSelectors } from './duck'
import MenuComponent from './MenuComponent'

const mapStateToProps = state => {
  const { scrollPercent, scrollPercentOffset } = state.home
  const {
    createScrollToTransform,
    getCurrentProjectIndex,
    getRollerProjects
  } = homeSelectors

  return {
    isDragging          : state.app.isDragging,
    scrollPercent       : scrollPercent + scrollPercentOffset,
    scrollToTransform   : createScrollToTransform(state),
    currentProjectIndex : getCurrentProjectIndex(state),
    projects            : getRollerProjects(state)
  }
}

const MenuContainer = connect(
  mapStateToProps,
  null
)(MenuComponent)

export default MenuContainer
