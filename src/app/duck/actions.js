import types from './types'

const makeSticky = (index, point) => ({
  type    : types.MAKE_STICKY,
  payload : {
    index,
    point
  }
})

const breakSticky = () => ({
  type: types.BREAK_STICKY
})

const startExitTransition = () => ({
  type: types.START_EXIT_TRANSITION
})

const startEnterTransition = () => ({
  type: types.START_ENTER_TRANSITION
})

const startTransition = () => ({
  type: types.START_TRANSITION
})

const endTransition = () => ({
  type: types.END_TRANSITION
})

const makeThemeDark = () => ({
  type: types.MAKE_THEME_DARK
})

const makeThemeLight = () => ({
  type: types.MAKE_THEME_LIGHT
})

const toggleCursor = () => ({
  type: types.TOGGLE_CURSOR
})

const startDragging = () => ({
  type: types.START_DRAGGING
})

const endDragging = () => ({
  type: types.END_DRAGGING
})

export default {
  makeSticky,
  breakSticky,
  startTransition,
  startEnterTransition,
  startExitTransition,
  endTransition,
  makeThemeDark,
  makeThemeLight,
  toggleCursor,
  startDragging,
  endDragging
}
