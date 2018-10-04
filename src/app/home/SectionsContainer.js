import { connect } from 'react-redux'
import SectionsComponent from './SectionsComponent'
import { homeSelectors } from './duck'

const mapStateToProps = state => {
  const { scrollPercent, scrollPercentOffset } = state.home
  const {
    getProjectsWithTags,
    getCurrentProjectIndex,
    createScrollToTransform
  } = homeSelectors
  return {
    isDragging          : state.app.isDragging,
    scrollPercent       : scrollPercent + scrollPercentOffset,
    projects            : getProjectsWithTags(state),
    currentProjectIndex : getCurrentProjectIndex(state),
    scrollToTransform   : createScrollToTransform(state)
  }
}

const SectionsContainer = connect(
  mapStateToProps,
  null
)(SectionsComponent)

export default SectionsContainer
