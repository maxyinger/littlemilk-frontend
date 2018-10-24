import { connect } from 'react-redux'
import { homeSelectors } from './duck'
import RollerComponent from './RollerComponent'

const mapStateToProps = state => {
  const { scrollPercent } = state.home
  const {
    getRollerProjects,
    getCurrentProjectIndex,
    createScrollToTransform,
    createTitleOpacityFromIndex,
    createNormalizedDragPipe
  } = homeSelectors
  return {
    isDragging          : state.app.isDragging,
    scrollPercent       : scrollPercent,
    projects            : getRollerProjects(state),
    currentProjectIndex : getCurrentProjectIndex(state),
    scrollToTransform   : createScrollToTransform(state),
    titleIndexToOpacity : createTitleOpacityFromIndex(state),
    normalizedDragPipe  : createNormalizedDragPipe(state)
  }
}

const RollerContainer = connect(
  mapStateToProps,
  null
)(RollerComponent)

export default RollerContainer
