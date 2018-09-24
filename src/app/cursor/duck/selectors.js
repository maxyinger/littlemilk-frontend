import { createSelector } from 'reselect'
import types from './types'

const getEnterTransition = state => state.enterTransition
const getExitTransition = state => state.exitTransition
const getSticky = state => state.sticky
const getStickyPoint = state => state.stickyPoint
const getNoCursor = state => state.noCursor

const getCursorPositionState = createSelector(
  [getEnterTransition, getExitTransition, getSticky, getStickyPoint],
  (enterTransition, exitTransition, sticky, stickyPoint) => {
    // if (exitTransition && stickyPoint.x !== null && stickyPoint.y !== null) {
    if (exitTransition) {
      return types.EXIT_TRANSITION
    } else if (enterTransition) {
      return types.ENTER_TRANSITION
    } else if (
      sticky >= 0 &&
      stickyPoint.x !== null &&
      stickyPoint.y !== null &&
      !exitTransition &&
      !enterTransition
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
    if (cursorPositionState === types.EXIT_TRANSITION) {
      return types.EXIT_TRANSITION
    } else if (cursorPositionState === types.ENTER_TRANSITION) {
      return types.ENTER_TRANSITION
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
