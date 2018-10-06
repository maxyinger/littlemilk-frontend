import { connect } from 'react-redux'
import { homeSelectors } from './duck'
import RollerComponent from './RollerComponent'

const mapStateToProps = state => {
  const { scrollPercent, scrollPercentOffset } = state.home
  const {
    getRollerProjects,
    getCurrentProjectIndex,
    createScrollToTransform,
    createTitleOpacityFromIndex
  } = homeSelectors
  return {
    isDragging          : state.app.isDragging,
    scrollPercent       : scrollPercent + scrollPercentOffset,
    projects            : getRollerProjects(state),
    currentProjectIndex : getCurrentProjectIndex(state),
    scrollToTransform   : createScrollToTransform(state),
    titleIndexToOpacity : createTitleOpacityFromIndex(state)
  }
}

const RollerContainer = connect(
  mapStateToProps,
  null
)(RollerComponent)

export default RollerContainer