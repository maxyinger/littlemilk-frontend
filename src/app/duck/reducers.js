import types from './types'

export const INITIAL_STATE = {
  sticky      : -1,
  stickyPoint : {
    x : null,
    y : null
  },
  canDrag             : true,
  isTransitioning     : false,
  transitionCompleted : false,
  theme               : 'light'
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
        isTransitioning     : true,
        transitionCompleted : false,
        sticky              : -1,
        canDrag             : false
      }
    }

    case types.END_TRANSITION: {
      return {
        ...state,
        transitionCompleted: true
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

    default:
      return state
  }
}

export default appReducer
