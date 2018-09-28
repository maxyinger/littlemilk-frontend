import { connect } from 'react-redux'
import HomeComponent from './HomeComponent'
import { appActions } from '../duck'
import { homeActions, homeSelectors } from './duck'

const mapStateToProps = state => ({
  scrollPercent            : state.home.scrollPercent,
  scrollPercentOffset      : state.home.scrollPercentOffset,
  isDragging               : state.app.isDragging,
  isDraggable              : homeSelectors.getIsDraggable(state),
  currentProject           : homeSelectors.getCurrentProjectIndex(state),
  projectsWithTags         : homeSelectors.getProjectsWithTags(state),
  projectImageUrls         : homeSelectors.getProjectImageUrls(state),
  projectIndexes           : homeSelectors.getProjectIndexes(state),
  clampScrollPercentOffset : homeSelectors.createClampScrollPercentOffset(state),
  stepsScrollPercent       : homeSelectors.createStepsScrollPercent(state)
})

const mapDispatchToProps = dispatch => ({
  makeThemeLight      : () => dispatch(appActions.makeThemeLight()),
  startDragging       : () => dispatch(appActions.startDragging()),
  endDragging         : () => dispatch(appActions.endDragging()),
  updateScrollPercent : scrollPercent =>
    dispatch(homeActions.updateScrollPercent(scrollPercent)),
  updateScrollPercentOffset: scrollPercentOffset =>
    dispatch(homeActions.updateScrollPercentOffset(scrollPercentOffset))
})

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent)

export default HomeContainer
