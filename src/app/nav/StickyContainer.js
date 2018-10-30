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
  const updateActiveIndex = activeIndex =>
    dispatch(appActions.updateActiveIndex(activeIndex))

  return {
    makeSticky,
    breakSticky,
    updateActiveIndex
  }
}

const StickyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StickyComponent)

export default StickyContainer
