import { connect } from 'react-redux'
import StickyComponent from './StickyComponent'
import { appActions } from '../duck'
import selectors from './duck/selectors'

const mapStateToProps = (state, props) => {
  const { to, exact, index, children } = props
  return {
    actionsState: selectors.getStickyActionsState(state.app, props),
    to,
    exact,
    index,
    children
  }
}

const mapDispatchToProps = dispatch => {
  const makeSticky = (index, point) =>
    dispatch(appActions.makeSticky(index, point))
  const breakSticky = () => dispatch(appActions.breakSticky())

  return {
    makeSticky,
    breakSticky
  }
}

const StickyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StickyComponent)

export default StickyContainer
