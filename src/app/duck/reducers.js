import types from './types'

export const INITIAL_STATE = {
  sticky      : -1,
  stickyPoint : {
    x : null,
    y : null
  },
  canDrag             : true,
  isTransitioning     : false,
  transitionCompleted : false
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
        stickyPoint         : {
          x : null,
          y : null
        },
        canDrag: false
      }
    }

    case types.END_TRANSITION: {
      return {
        ...INITIAL_STATE,
        transitionCompleted: true
      }
    }

    default:
      return state
  }
}

export default appReducer
