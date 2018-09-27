import homeReducer, { homeSelectors, homeTypes } from './'
import { INITIAL_STATE } from './reducers'

describe('Home Reducer:', () => {
  it('Has a default state.', () => {
    expect(homeReducer(undefined, {})).toEqual(INITIAL_STATE)
  })

  it('Can update scrollPercent.', () => {
    const { scrollPercent } = homeReducer(undefined, {
      type    : homeTypes.UPDATE_SCROLL_PERCENT,
      payload : {
        scrollPercent: 0.2
      }
    })
    expect(scrollPercent).toEqual(0.2)
  })
})

describe('Home Selectors:', () => {
  const {
    getIsDraggable,
    getProjectsWithTags,
    getProjectImageUrls,
    getProjectIndexes,
    getCurrentProjectIndex
  } = homeSelectors

  describe('getIsDraggable:', () => {
    it('Returns true if stickyIndex is less than 0.', () => {
      const state = {
        app: {
          stickyIndex: -1
        }
      }
      expect(getIsDraggable(state)).toEqual(true)
    })
    it('Returns true if stickyIndex is greater than or equal to 0.', () => {
      const state = {
        app: {
          stickyIndex: 2
        }
      }
      expect(getIsDraggable(state)).toEqual(false)
    })
  })

  const state = {
    scrollPercent : 0,
    home          : {
      projects: {
        byId: {
          project_1: {
            id       : 'project_1',
            name     : 'test 1',
            imageUrl : 'image_1.png',
            tags     : [1, 2]
          },
          project_2: {
            id       : 'project_2',
            name     : 'test 2',
            imageUrl : 'image_2.png',
            tags     : [2]
          }
        },
        allIds: ['project_1', 'project_2']
      },
      tags: {
        byId: {
          1: {
            id   : 1,
            name : 'tag 1'
          },
          2: {
            id   : 2,
            name : 'tag 2'
          }
        },
        allIds: [1, 2]
      }
    }
  }
  describe('getProjectsWithTags:', () => {
    const projects = getProjectsWithTags(state)
    it('Returns all projects.', () => {
      expect(projects).toHaveLength(2)
    })

    it('Returns project objects.', () => {
      expect(projects[0].name).toEqual('test 1')
      expect(projects[1].name).toEqual('test 2')
    })

    it('Converts tag ids to tag names.', () => {
      expect(projects[0].tags[0]).toEqual('tag 1')
      expect(projects[0].tags[1]).toEqual('tag 2')
      expect(projects[1].tags[0]).toEqual('tag 2')
    })
  })

  describe('getProjectImageUrls:', () => {
    const projectImageUrls = getProjectImageUrls(state)
    it('Returns all images.', () => {
      expect(projectImageUrls).toHaveLength(2)
    })

    it('Returns imageUrls.', () => {
      expect(projectImageUrls[0]).toEqual('image_1.png')
      expect(projectImageUrls[1]).toEqual('image_2.png')
    })
  })

  describe('getProjectIndexes:', () => {
    const indexes = getProjectIndexes(state)
    it('Returns all indexes.', () => {
      expect(indexes).toHaveLength(2)
    })

    it('Returns 0 prefixed indexes starting at 01.', () => {
      expect(indexes[0]).toEqual('01')
      expect(indexes[1]).toEqual('02')
    })
  })

  describe('getCurrentProjectIndex:', () => {
    let state = {
      home: {
        scrollPercent : 0,
        projects      : {
          byId   : {},
          allIds : [1, 2, 3]
        }
      }
    }
    it('Should return the index of the 2nd item, 1, from scrollPercent .4 and 3 projects.', () => {
      state.home.scrollPercent = 60
      expect(getCurrentProjectIndex(state)).toEqual(2)
    })
    it('Should return the index of the 1st item, 0, from scrollPercent .23 and 3 projects.', () => {
      state.home.scrollPercent = 100
      expect(getCurrentProjectIndex(state)).toEqual(0)
    })
  })
})
