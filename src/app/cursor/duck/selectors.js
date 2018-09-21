import { createSelector } from 'reselect'
import types from './types'

const getPageTransitioning = state => state.pageTransitioning
const getStickyIndex = state => state.stickyIndex
const getStickyPoint = state => state.getStickyPoint
const getNoCursor = state => state.noCursor

const getCursorPositionState = createSelector(
  [getPageTransitioning, getStickyIndex, getStickyPoint],
  (pageTransitioning, stickyIndex, stickyPoint) => {
    if (pageTransitioning && stickyPoint !== { x: null, y: null }) {
      return types.TRANSITIONING
    } else if (
      stickyIndex >= 0 &&
      stickyPoint !== { x: null, y: null } &&
      !pageTransitioning
    ) {
      return types.STICKY
    } else {
      return types.DEFAULT
    }
  }
)

const getCursorAppearanceState = createSelector(
  [getCursorPositionState, getNoCursor],
  (cursorPositionState, noCursor) => {
    if (cursorPositionState === types.TRANSITIONING) {
      return types.TRANSITIONING
    } else if (cursorPositionState === types.STICKY) {
      return types.STICKY
    } else if (noCursor) {
      return types.NO_CURSOR
    } else {
      return types.DEFAULT
    }
  }
)

export default {
  getCursorPositionState,
  getCursorAppearanceState
}
