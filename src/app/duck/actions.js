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

export default {
  makeSticky,
  breakSticky
}
