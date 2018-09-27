import types from './types'

export const INITIAL_STATE = {
  stickyIndex : -1,
  activeIndex : -1,
  stickyPoint : {
    x : null,
    y : null
  },
  isDragging        : false,
  isEnterTransition : false,
  isExitTransition  : false,
  noCursor          : false,
  theme             : 'light'
}

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.MAKE_STICKY: {
      const { index, point } = action.payload
      return {
        ...state,
        stickyIndex : index,
        stickyPoint : point
      }
    }

    case types.BREAK_STICKY: {
      return {
        ...state,
        stickyIndex : -1,
        stickyPoint : {
          x : null,
          y : null
        }
      }
    }

    case types.START_EXIT_TRANSITION: {
      const { stickyIndex } = state
      return {
        ...state,
        activeIndex       : stickyIndex,
        isExitTransition  : true,
        isEnterTransition : false
      }
    }

    case types.START_ENTER_TRANSITION: {
      return {
        ...state,
        isExitTransition  : false,
        isEnterTransition : true
      }
    }

    case types.END_TRANSITION: {
      return {
        ...state,
        isExitTransition  : false,
        isEnterTransition : false,
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

    case types.START_DRAGGING: {
      return {
        ...state,
        isDragging: true
      }
    }

    case types.END_DRAGGING: {
      return {
        ...state,
        isDragging: false
      }
    }

    default:
      return state
  }
}

export default appReducer
