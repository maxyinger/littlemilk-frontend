import { createSelector } from 'reselect'
import types from './types'

const getEnterTransition = state => state.isEnterTransition
const getExitTransition = state => state.isExitTransition
const getStickyIndex = state => state.stickyIndex
const getStickyPoint = state => state.stickyPoint
const getNoCursor = state => state.noCursor
const getIsDragging = state => state.isDragging

const getCursorPositionState = createSelector(
  [
    getEnterTransition,
    getExitTransition,
    getStickyIndex,
    getStickyPoint,
    getIsDragging
  ],
  (
    isEnterTransition,
    isExitTransition,
    stickyIndex,
    stickyPoint,
    isDragging
  ) => {
    if (isExitTransition) {
      return types.EXIT_TRANSITION
    } else if (isEnterTransition) {
      return types.ENTER_TRANSITION
    } else if (isDragging) {
      return types.IS_DRAGGING
    } else if (
      stickyIndex >= 0 &&
      stickyPoint.x !== null &&
      stickyPoint.y !== null
    ) {
      return types.IS_STICKY
    } else {
      return types.DEFAULT
    }
  }
)

const getCursorAppearanceState = createSelector(
  [getCursorPositionState, getNoCursor],
  (cursorPositionState, noCursor) => {
    if (cursorPositionState === types.EXIT_TRANSITION) {
      return types.EXIT_TRANSITION
    } else if (cursorPositionState === types.ENTER_TRANSITION) {
      return types.ENTER_TRANSITION
    } else if (cursorPositionState === types.IS_STICKY) {
      return types.IS_STICKY
    } else if (cursorPositionState === types.IS_DRAGGING) {
      return types.IS_DRAGGING
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
