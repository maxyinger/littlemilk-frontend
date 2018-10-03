import { connect } from 'react-redux'
import { homeSelectors } from './duck'
import RollerComponent from './RollerComponent'

const mapStateToProps = state => ({
  isDragging          : state.app.isDragging,
  scrollPercent       : state.home.scrollPercent + state.home.scrollPercentOffset,
  projects            : homeSelectors.getRollerProjects(state),
  currentProjectIndex : homeSelectors.getCurrentProjectIndex(state),
  scrollToTransform   : homeSelectors.createRollerScrollToTransform(state),
  titleIndexToOpacity : homeSelectors.createTitleOpacityFromIndex(state)
})

const RollerContainer = connect(
  mapStateToProps,
  null
)(RollerComponent)

export default RollerContainer
