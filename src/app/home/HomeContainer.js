import { connect } from 'react-redux'
import HomeComponent from './HomeComponent'
import { appActions } from '../duck'
import { homeActions, homeSelectors } from './duck'

const mapStateToProps = state => ({
  scrollPercent    : state.home.scrollPercent,
  isDragging       : state.app.isDragging,
  isDraggable      : homeSelectors.getIsDraggable(state),
  projectsWithTags : homeSelectors.getProjectsWithTags(state)
})

const mapDispatchToProps = dispatch => ({
  makeThemeLight      : () => dispatch(appActions.makeThemeLight()),
  startDragging       : () => dispatch(appActions.startDragging()),
  endDragging         : () => dispatch(appActions.endDragging()),
  updateScrollPercent : scrollPercent =>
    dispatch(homeActions.updateScrollPercent(scrollPercent))
})

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent)

export default HomeContainer
