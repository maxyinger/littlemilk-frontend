import types from './types'

const updateScrollPercentOffset = scrollPercentOffset => ({
  type    : types.UPDATE_SCROLL_PERCENT_OFFSET,
  payload : {
    scrollPercentOffset
  }
})

const updateScrollPercent = scrollPercent => ({
  type    : types.UPDATE_SCROLL_PERCENT,
  payload : {
    scrollPercent
  }
})

export default {
  updateScrollPercent,
  updateScrollPercentOffset
}
