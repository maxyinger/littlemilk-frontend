import { connect } from 'react-redux'
import { homeSelectors, homeActions } from './duck'
import MenuComponent from './MenuComponent'

const mapStateToProps = state => {
  const { scrollPercent } = state.home
  const {
    createScrollToTransform,
    getRollerProjects,
    createNormalizedDragPipe,
    createScrollPercentToIndex,
    createStepsScrollPercent
  } = homeSelectors

  return {
    isDragging           : state.app.isDragging,
    scrollPercent        : scrollPercent,
    scrollToTransform    : createScrollToTransform(state),
    projects             : getRollerProjects(state),
    normalizedDragPipe   : createNormalizedDragPipe(state),
    scrollPercentToIndex : createScrollPercentToIndex(state),
    stepsScrollPercent   : createStepsScrollPercent(state)
  }
}

const mapDispatchToProps = dispatch => ({
  updateCurrentProjectIndex: index =>
    dispatch(homeActions.updateCurrentProjectIndex(index)),
  updateScrollPercent: scrollPercent =>
    dispatch(homeActions.updateScrollPercent(scrollPercent))
})

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuComponent)

export default MenuContainer
