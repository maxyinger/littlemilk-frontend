import { connect } from 'react-redux'
import SectionsComponent from './SectionsComponent'
import { homeSelectors } from './duck'

const mapStateToProps = state => {
  const { getProjectsWithTags, createScrollPercentToIndex } = homeSelectors
  return {
    isDragging          : state.app.isDragging,
    projects            : getProjectsWithTags(state),
    // currentProjectIndex : state.home.currentProjectIndex
    currentProjectIndex : createScrollPercentToIndex(state)(
      state.home.scrollPercent
    )
  }
}

const SectionsContainer = connect(
  mapStateToProps,
  null
)(SectionsComponent)

export default SectionsContainer
