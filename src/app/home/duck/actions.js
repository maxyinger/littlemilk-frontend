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

const updateCurrentProjectIndex = currentProjectIndex => ({
  type    : types.UPDATE_CURRENT_PROJECT_INDEX,
  payload : {
    currentProjectIndex
  }
})

export default {
  updateScrollPercent,
  updateScrollPercentOffset,
  updateCurrentProjectIndex
}
