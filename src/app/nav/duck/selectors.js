import { createSelector } from 'reselect'
import types from './types'

const getEnterTransition = state => state.isEnterTransition
const getExitTransition = state => state.isExitTransition
const getActiveIndex = state => state.activeIndex
const getStickyIndex = state => state.stickyIndex
const getIsDragging = state => state.isDragging
const getIndex = (state, props) => props.index

const getStickyActionsState = createSelector(
  [
    getStickyIndex,
    getActiveIndex,
    getIndex,
    getExitTransition,
    getEnterTransition,
    getIsDragging
  ],
  (
    stickyIndex,
    activeIndex,
    index,
    isExitTransition,
    isEnterTransition,
    isDragging
  ) => {
    if (isDragging) {
      return types.IS_DRAGGING
    } else if (isExitTransition) {
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
