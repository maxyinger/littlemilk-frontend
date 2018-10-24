import { createSelector } from 'reselect'
import { transform } from 'popmotion'

const { interpolate, steps, pipe, clamp, linearSpring, conditional } = transform

const getStickyIndex = ({ app }) => app.stickyIndex
const getNoCursor = ({ app }) => app.noCursor
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

const createStepsScrollPercent = createSelector([getNumProjects], numProjects =>
  pipe(
    clamp(0, 1),
    // v => stepProgress(numProjects, v)
    steps(numProjects, 0, 1)
  )
)

const getIsDraggable = createSelector(
  [getStickyIndex, getIsEnterTransition, getIsExitTransition, getNoCursor],
  (stickyIndex, isEnterTransition, isExitTransition, noCursor) =>
    stickyIndex < 0 && !isEnterTransition && !isExitTransition && !noCursor
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

const getRollerProjects = createSelector([getProjects], projects =>
  projects.allIds.map((id, i) => {
    const plusOne = i + 1
    let indexName = `0${plusOne}.`
    if (plusOne < 10) indexName = `00${plusOne}.`
    return {
      indexName,
      title: projects.byId[id].title
    }
  })
)

const createTitleOpacityFromIndex = createSelector(
  [getNumProjects],
  numProjects => index =>
    pipe(
      interpolate([0, 1], [0, numProjects - 1]),
      v => index - v,
      v => v * 3,
      v => v + 0.3,
      v => Math.abs(v),
      v => v - 1,
      clamp(0, 1)
    )
)

const createScrollToTransform = createSelector([getNumProjects], numProjects =>
  pipe(
    interpolate([0, 1], [0, numProjects - 1]),
    v => v * -100
  )
)

// const createScrollPercentToIndex = createSelector(
//   [getNumProjects],
//   numProjects =>
//     pipe(
//       interpolate([0, 1], [0, numProjects - 1]),
//       v => v - 0.5,
//       steps(numProjects, 0, numProjects - 1)
//     )
// )

const createScrollPercentToIndex = createSelector(
  [getNumProjects],
  numProjects =>
    pipe(
      clamp(0, 1),
      interpolate([0, 1], [0, numProjects - 1]),
      steps(numProjects, 0, numProjects - 1)
    )
)

const getCurrentProjectIndex = createSelector(
  [createScrollPercentToIndex, getScrollPercent, getScrollPercentOffset],
  (scrollPercentToIndex, scrollPercent, scrollPercentOffset) =>
    scrollPercentToIndex(scrollPercent + scrollPercentOffset)
)

const createNormalizedDragPipe = createSelector(
  [getScrollPercent],
  scrollPercent =>
    pipe(
      // Initialize pointer with initial yPos
      ({ y }) => -1 * y,
      // Normalize with window.innerHeight (yPercent)
      v => v / window.innerHeight,
      // Map to be percentage of viewport
      v => v * (100 / 70),
      // If current scroll + yPercent greater than 1 add contraint motion towards 1
      conditional(
        v => v > 1 - scrollPercent,
        linearSpring(0.1, 1 - scrollPercent)
      ),
      // If current scroll + yPercent less than 0 add constraint motion towards 0
      conditional(
        v => v < -1 * scrollPercent,
        linearSpring(0.1, -1 * scrollPercent)
      )
    )
)

export default {
  getIsDraggable,
  getProjectsWithTags,
  getProjectImageUrls,
  getRollerProjects,
  createScrollToTransform,
  createTitleOpacityFromIndex,
  getCurrentProjectIndex,
  createClampScrollPercentOffset,
  createStepsScrollPercent,
  createNormalizedDragPipe,
  createScrollPercentToIndex
}
