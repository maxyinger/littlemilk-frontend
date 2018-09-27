import { connect } from 'react-redux'
import CursorComponent from './CursorComponent'
import selectors from './duck/selectors'

const mapStateToProps = state => ({
  actionsState: {
    position   : selectors.getCursorPositionState(state.app),
    appearance : selectors.getCursorAppearanceState(state.app)
  },
  stickyPoint : state.app.stickyPoint,
  theme       : state.app.theme
})

const CursorContainer = connect(
  mapStateToProps,
  null
)(CursorComponent)

export default CursorContainer
