import { createSelector } from 'reselect'
import { interpolate, steps, pipe, clamp } from 'popmotion/lib/transformers'

const getStickyIndex = ({ app }) => app.stickyIndex
const getIsEnterTransition = ({ app }) => app.isEnterTransition
const getIsExitTransition = ({ app }) => app.isExitTransition
const getProjects = ({ home }) => home.projects
const getNumProjects = ({ home }) => home.projects.allIds.length
const getTags = ({ home }) => home.tags
const getScrollPercent = ({ home }) => home.scrollPercent
const getScrollPercentOffset = ({ home }) => home.scrollPercentOffset

const stepProgress = (steps, progress) => {
  const segment = 1 / (steps - 1)
  const subsegment = 1 / (2 * (steps - 1))
  const percentProgressOfTarget = Math.min(progress, 1)
  const subsegmentProgressOfTarget = percentProgressOfTarget / subsegment
  const segmentProgressOfTarget = Math.floor(
    (subsegmentProgressOfTarget + 1) / 2
  )

  return segmentProgressOfTarget * segment
}

const createClampScrollPercentOffset = createSelector(
  [getScrollPercent],
  scrollPercent => clamp(-1 * scrollPercent, 1 - scrollPercent)
)

const createStepsScrollPercent = createSelector(
  [getScrollPercent, getNumProjects],
  (scrollPercent, numProjects) =>
    pipe(
      v => v + scrollPercent,
      v => stepProgress(numProjects, v)
    )
)

const getIsDraggable = createSelector(
  [getStickyIndex, getIsEnterTransition, getIsExitTransition],
  (stickyIndex, isEnterTransition, isExitTransition) =>
    stickyIndex < 0 && !isEnterTransition && !isExitTransition
)

const getTagNamesById = (tags, ids) => ids.map(id => tags.byId[id].name)

const getProjectsWithTags = createSelector(
  [getProjects, getTags],
  (projects, tags) =>
    projects.allIds.map(id => ({
      ...projects.byId[id],
      tags: getTagNamesById(tags, projects.byId[id].tags)
    }))
)

const getProjectImageUrls = createSelector([getProjectsWithTags], projects =>
  projects.map(project => project.imageUrl)
)

const getProjectIndexes = createSelector([getProjects], projects =>
  projects.allIds.map((id, i) => {
    const plusOne = i + 1
    if (plusOne < 10) return `0${plusOne}`
    return `${plusOne}`
  })
)

const createScrollToIndex = createSelector([getNumProjects], numProjects =>
  pipe(
    interpolate([0, 1], [1, numProjects]),
    steps(numProjects, 1, numProjects)
  )
)

const getCurrentProjectIndex = createSelector(
  [createScrollToIndex, getScrollPercent, getScrollPercentOffset],
  (scrollToIndex, scrollPercent, scrollPercentOffset) =>
    scrollToIndex(scrollPercent + scrollPercentOffset)
)

export default {
  getIsDraggable,
  getProjectsWithTags,
  getProjectImageUrls,
  getProjectIndexes,
  getCurrentProjectIndex,
  createClampScrollPercentOffset,
  createStepsScrollPercent
}
