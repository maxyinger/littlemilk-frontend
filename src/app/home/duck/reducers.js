import types from './types'

export const INITIAL_STATE = {
  scrollPercent : 0,
  projects      : {
    byId: {
      incredible: {
        id          : 'incredible',
        title       : 'Incredible',
        year        : 2018,
        imageUrl    : 'image.png',
        description :
          'Here is a small description for this project. I hope you like it!',
        tags: [1]
      },
      hollis: {
        id          : 'hollis',
        title       : 'Hollis',
        year        : 2018,
        imageUrl    : 'image.png',
        description :
          'Here is a small description for this project. I hope you like it!',
        tags: [2]
      },
      voltiv: {
        id          : 'voltiv',
        title       : 'Voltiv',
        year        : 2018,
        imageUrl    : 'image.png',
        description :
          'Here is a small description for this project. I hope you like it!',
        tags: [1, 2]
      },
      cognak: {
        id          : 'cogank',
        title       : 'Cognak',
        year        : 2018,
        imageUrl    : 'image.png',
        description :
          'Here is a small description for this project. I hope you like it!',
        tags: [1]
      },
      stoneturn: {
        id          : 'stoneturn',
        title       : 'Stoneturn',
        year        : 2018,
        imageUrl    : 'image.png',
        description :
          'Here is a small description for this project. I hope you like it!',
        tags: [1, 2]
      }
    },
    allIds: ['incredible', 'hollis', 'voltiv', 'cognak', 'stoneturn']
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

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.UPDATE_SCROLL_PERCENT: {
      const { scrollPercent } = action.payload
      return {
        ...state,
        scrollPercent
      }
    }
    default:
      return state
  }
}

export default homeReducer
