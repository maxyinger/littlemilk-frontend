import { connect } from 'react-redux'
import { homeSelectors } from './duck'
import PaginationComponent from './PaginationComponent'

const mapStateToProps = state => ({
  isDragging          : state.app.isDragging,
  scrollPercent       : state.home.scrollPercent + state.home.scrollPercentOffset,
  projectIndexes      : homeSelectors.getProjectIndexes(state),
  currentProjectIndex : homeSelectors.getCurrentProjectIndex(state)
})

const PaginationContainer = connect(
  mapStateToProps,
  null
)(PaginationComponent)

export default PaginationContainer
