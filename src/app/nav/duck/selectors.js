import { createSelector } from 'reselect'
import types from './types'

const getEnterTransition = state => state.isEnterTransition
const getExitTransition = state => state.isExitTransition
const getActiveIndex = state => state.activeIndex
const getStickyIndex = state => state.stickyIndex
const getIndex = (state, props) => props.index

const getStickyActionsState = createSelector(
  [
    getStickyIndex,
    getActiveIndex,
    getIndex,
    getExitTransition,
    getEnterTransition
  ],
  (stickyIndex, activeIndex, index, isExitTransition, isEnterTransition) => {
    if (isExitTransition) {
      return types.EXIT_TRANSITION
    } else if (isEnterTransition) {
      return types.ENTER_TRANSITION
    } else if (activeIndex === index) {
      return types.IS_ACTIVE
    } else if (stickyIndex === index) {
      return types.IS_STICKY
    } else {
      return types.DEFAULT
    }
  }
)

export default {
  getStickyActionsState
}
