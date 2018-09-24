import types from './types'

export const INITIAL_STATE = {
  sticky      : -1,
  stickyPoint : {
    x : null,
    y : null
  },
  canDrag           : true,
  pageTransitioning : false,
  enterTransition   : false,
  exitTransition    : false,
  noCursor          : false,
  theme             : 'light'
}

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.MAKE_STICKY: {
      const { index, point } = action.payload
      return {
        ...state,
        sticky      : index,
        stickyPoint : point,
        canDrag     : false
      }
    }

    case types.BREAK_STICKY: {
      return {
        ...state,
        sticky      : -1,
        canDrag     : true,
        stickyPoint : {
          x : null,
          y : null
        }
      }
    }

    case types.START_TRANSITION: {
      return {
        ...state,
        pageTransitioning : true,
        sticky            : -1,
        canDrag           : false
      }
    }

    case types.START_EXIT_TRANSITION: {
      return {
        ...state,
        exitTransition  : true,
        enterTransition : false
      }
    }

    case types.START_ENTER_TRANSITION: {
      return {
        ...state,
        exitTransition  : false,
        enterTransition : true
      }
    }

    case types.END_TRANSITION: {
      return {
        ...state,
        pageTransitioning : false,
        exitTransition    : false,
        enterTransition   : false,
        stickyPoint       : {
          x : null,
          y : null
        }
      }
    }

    case types.MAKE_THEME_DARK: {
      return {
        ...state,
        theme: 'dark'
      }
    }

    case types.MAKE_THEME_LIGHT: {
      return {
        ...state,
        theme: 'light'
      }
    }

    case types.TOGGLE_CURSOR: {
      const { noCursor } = state
      return {
        ...state,
        noCursor: !noCursor
      }
    }

    default:
      return state
  }
}

export default appReducer
