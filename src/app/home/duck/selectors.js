import { createSelector } from 'reselect'
import { interpolate, steps, pipe } from 'popmotion/lib/transformers'

const getStickyIndex = ({ app }) => app.stickyIndex
const getProjects = ({ home }) => home.projects
const getTags = ({ home }) => home.tags
const getScrollPercent = ({ home }) => home.scrollPercent

const getIsDraggable = createSelector([getStickyIndex], stickyIndex => {
  return stickyIndex < 0
})

// getTagNamesById :: {}, number[] -> string[]
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

const createScrollToIndex = createSelector([getProjects], ({ allIds }) =>
  pipe(
    steps(allIds.length, 0, 100)
    // interpolate([0, 1], [1, allIds.length])
  )
)

const getCurrentProjectIndex = createSelector(
  [createScrollToIndex, getScrollPercent],
  (scrollToIndex, scrollPercent) => scrollToIndex(scrollPercent)
)

export default {
  getIsDraggable,
  getProjectsWithTags,
  getProjectImageUrls,
  getProjectIndexes,
  getCurrentProjectIndex
}
