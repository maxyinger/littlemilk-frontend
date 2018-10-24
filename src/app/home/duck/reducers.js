import types from './types'

export const INITIAL_STATE = {
  scrollPercent       : 0,
  scrollPercentOffset : 0,
  currentProjectIndex : 0,
  projects            : {
    byId: {
      incredible: {
        id            : 'incredible',
        title         : 'Incredible',
        client        : 'Incredible Foods',
        year          : 2018,
        collaborators : ['Cognak'],
        roles         : ['Full stack development', 'Interaction design'],
        imageUrl      : 'image.png',
        description   :
          'Here is a small description for this project. I hope you like it!',
        tags: [1]
      },
      hollis: {
        id            : 'hollis',
        title         : 'Hollis',
        client        : 'Hollis Autobody',
        year          : 2017,
        collaborators : ['Facta Studio', 'Initial Design Group'],
        roles         : ['Front end development', 'Interaction design'],
        imageUrl      : 'image.png',
        description   :
          'Here is a small description for this project. I hope you like it!',
        tags: [2]
      },
      voltiv: {
        id            : 'voltiv',
        title         : 'Voltiv',
        client        : 'Voltiv Sound',
        year          : 2018,
        collaborators : [],
        roles         : ['Full stack development', 'Interaction design'],
        imageUrl      : 'image.png',
        description   :
          'Here is a small description for this project. I hope you like it!',
        tags: [1, 2]
      },
      cognak: {
        id            : 'cogank',
        title         : 'Cognak',
        client        : 'Cognak',
        year          : 2016,
        collaborators : ['Cognak'],
        roles         : ['Full stack development', 'Interaction design'],
        imageUrl      : 'image.png',
        description   :
          'Collaborated in 2016 with Cognak to develop a new website showcasing Cognak’s distilled, clean look & feel.',
        tags: [1]
      },
      stoneturn: {
        id            : 'stoneturn',
        title         : 'StoneTurn',
        client        : 'Stoneturn',
        year          : 2017,
        collaborators : ['Facta Studio', 'Initial Design Group'],
        roles         : ['Front end development', 'Interaction design'],
        imageUrl      : 'image.png',
        description   :
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
        scrollPercent,
        scrollPercentOffset: 0
      }
    }

    case types.UPDATE_SCROLL_PERCENT_OFFSET: {
      const { scrollPercentOffset } = action.payload
      return {
        ...state,
        scrollPercentOffset
      }
    }

    case types.UPDATE_CURRENT_PROJECT_INDEX: {
      const { currentProjectIndex } = action.payload
      return {
        ...state,
        currentProjectIndex
      }
    }

    default:
      return state
  }
}

export default homeReducer
