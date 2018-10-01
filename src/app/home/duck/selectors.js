import { createSelector } from 'reselect'
import { transform } from 'popmotion'

const { interpolate, steps, pipe, clamp } = transform

const getStickyIndex = ({ app }) => app.stickyIndex
const getIsEnterTransition = ({ app }) => app.isEnterTransition
const getIsExitTransition = ({ app }) => app.isExitTransition
const getProjects = ({ home }) => home.projects
const getNumProjects = ({ home }) => home.projects.allIds.length
const getTags = ({ home }) => home.tags
const getScrollPercent = ({ home }) => home.scrollPercent
const getScrollPercentOffset = ({ home }) => home.scrollPercentOffset

const createClampScrollPercentOffset = createSelector(
  [getScrollPercent],
  scrollPercent => clamp(-1 * scrollPercent, 1 - scrollPercent)
)

const createStepsScrollPercent = createSelector(
  [getScrollPercent, getNumProjects],
  (scrollPercent, numProjects) =>
    pipe(
      v => v + scrollPercent,
      // v => stepProgress(numProjects, v)
      steps(numProjects, 0, 1)
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
    if (plusOne < 10) return `.${plusOne}`
    return `${plusOne}`
  })
)

const createScrollPercentToIndex = createSelector(
  [getNumProjects],
  numProjects =>
    pipe(
      interpolate([0, 1], [0, numProjects - 1]),
      steps(numProjects, 0, numProjects - 1)
    )
)

const getCurrentProjectIndex = createSelector(
  [createScrollPercentToIndex, getScrollPercent, getScrollPercentOffset],
  (scrollPercentToIndex, scrollPercent, scrollPercentOffset) =>
    scrollPercentToIndex(scrollPercent + scrollPercentOffset)
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
