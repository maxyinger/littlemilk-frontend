import { connect } from 'react-redux'
import StickyComponent from './StickyComponent'
import { appActions } from '../duck'

const mapStateToProps = (state, props) => {
  const { sticky, isTransitioning } = state.app
  const { to, exact, index, children } = props
  return {
    sticky,
    isTransitioning,
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
  const startTransition = () => dispatch(appActions.startTransition())

  return {
    makeSticky,
    breakSticky,
    startTransition
  }
}

const StickyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StickyComponent)

export default StickyContainer
