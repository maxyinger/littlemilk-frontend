import React from 'react'
import PropTypes from 'prop-types'
import posed from 'react-pose'
import { transform } from 'popmotion'
const { pipe, interpolate, steps } = transform

const PaginationWrap = posed.div({
  dragging: {
    // staggerChildren : 50,
    beforeChildren : false,
    y              : ({ scrollPercent, numProjects }) =>
      pipe(
        interpolate([0, 1], [0, numProjects - 1]),
        // steps(nunm)
        v => (v * -100) / numProjects,
        v => v + '%'
      )(scrollPercent),
    scrollPercent : ({ scrollPercent }) => scrollPercent,
    transition    : { type: 'spring' }
  },
  notDragging: {
    scrollPercent : ({ scrollPercent }) => scrollPercent,
    y             : ({ scrollPercent, numProjects }) =>
      pipe(
        interpolate([0, 1], [0, numProjects - 1]),
        // steps(nunm)
        v => (v * -100) / numProjects,
        v => v + '%'
      )(scrollPercent),
    transition: { type: 'spring' }
  }
})

const PaginationIndexWrap = posed.div({
  dragging: {
    y: ({ scrollPercent, numProjects, projectIndex }) =>
      pipe(
        interpolate([0, 1], [0, numProjects - 1]),
        v => v - projectIndex,
        v => v * -10 * Math.pow(2, Math.abs(v)),
        v => v + '%'
      )(scrollPercent),
    scale: ({ scrollPercent, numProjects, projectIndex }) =>
      pipe(
        interpolate([0, 1], [0, numProjects - 1]),
        v => Math.abs(v - projectIndex),
        v => 1 - v * (2 / numProjects),
        v => Math.max(0, v)
      )(scrollPercent),
    // scale      : 0.3,
    transition: { type: 'spring' }
  },
  notDragging: {
    y: ({ scrollPercent, numProjects, projectIndex }) =>
      pipe(
        interpolate([0, 1], [0, numProjects - 1]),
        v => v - projectIndex,
        v => v * -10 * Math.pow(2, Math.abs(v)),
        v => v + '%'
      )(scrollPercent),
    scale: ({ scrollPercent, numProjects, projectIndex }) =>
      pipe(
        interpolate([0, 1], [0, numProjects - 1]),
        v => Math.abs(v - projectIndex),
        v => 1 - v * (2 / numProjects),
        v => Math.max(0, v)
      )(scrollPercent),
    // scale      : 0.3,
    transition: { type: 'spring' }
  }
  // passive: {
  //   y: ({ projectIndex, numProjects }) => [
  //     'scrollPercent',
  //     pipe(
  //       interpolate([0, 1], [0, numProjects - 1]),
  //       v => v - projectIndex,
  //       v => v * -100,
  //       v => v + '%'
  //     ),
  //     true
  //   ]
  // }
})

const PaginationComponent = ({
  scrollPercent,
  isDragging,
  projectIndexes,
  currentProjectIndex
}) => (
  <PaginationWrap
    pose={isDragging ? 'dragging' : 'notDragging'}
    poseKey={scrollPercent}
    scrollPercent={scrollPercent}
    numProjects={projectIndexes.length}
  >
    {projectIndexes.map((index, i) => (
      <PaginationIndexWrap
        key={index}
        poseKey={scrollPercent}
        scrollPercent={scrollPercent}
        numProjects={projectIndexes.length}
        projectIndex={i}
      >
        <div className="h-pagination">{index}</div>
      </PaginationIndexWrap>
    ))}
  </PaginationWrap>
)

PaginationComponent.propTypes = {
  scrollPercent       : PropTypes.number.isRequired,
  isDragging          : PropTypes.bool.isRequired,
  currentProjectIndex : PropTypes.number.isRequired,
  projectIndexes      : PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default PaginationComponent
