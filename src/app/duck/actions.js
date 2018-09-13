import types from './types'

/**
 * * Action Creators
 */
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

const startTransition = () => ({
  type: types.START_TRANSITION
})

const endTransition = () => ({
  type: types.END_TRANSITION
})

export default {
  makeSticky,
  breakSticky,
  startTransition,
  endTransition
}
