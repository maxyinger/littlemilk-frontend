import types from './types'

const updateScrollPercent = scrollPercent => ({
  type    : types.UPDATE_SCROLL_PERCENT,
  payload : {
    scrollPercent
  }
})

export default {
  updateScrollPercent
}
