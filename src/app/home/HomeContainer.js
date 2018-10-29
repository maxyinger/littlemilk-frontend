import { connect } from 'react-redux'
import HomeComponent from './HomeComponent'
import { appActions } from '../duck'
import { homeSelectors } from './duck'

const mapStateToProps = state => ({
  isDragging  : state.app.isDragging,
  isDraggable : homeSelectors.getIsDraggable(state)
})

const mapDispatchToProps = dispatch => ({
  startDragging : () => dispatch(appActions.startDragging()),
  endDragging   : () => dispatch(appActions.endDragging())
})

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent)

export default HomeContainer
