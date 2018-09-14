import appReducer, { INITIAL_STATE } from './reducers'
import appActions from './actions'

describe('App Reducer', () => {
  it('has a default state', () => {
    expect(appReducer(undefined, { type: 'undefined' })).toEqual(INITIAL_STATE)
  })

  it('has a sticky state', () => {
    expect(appReducer(undefined, appActions.makeSticky(8, {}))).toEqual({
      ...INITIAL_STATE,
      sticky      : 8,
      stickyPoint : {},
      canDrag     : false
    })
  })

  it('can default back from sticky state', () => {
    const stickyState = appReducer(undefined, appActions.makeSticky(6, {}))
    expect(appReducer(stickyState, appActions.breakSticky())).toEqual(
      INITIAL_STATE
    )
  })

  it('can trigger a transition', () => {
    const { isTransitioning } = appReducer(
      undefined,
      appActions.startTransition()
    )
    expect(isTransitioning).toEqual(true)
  })

  it('makes sure isTransitioning is the only active app state', () => {
    let testState = appReducer(undefined, appActions.makeSticky(4, {}))
    expect(appReducer(testState, appActions.startTransition())).toEqual({
      ...INITIAL_STATE,
      isTransitioning     : true,
      transitionCompleted : false,
      sticky              : -1,
      stickyPoint         : {
        x : null,
        y : null
      },
      canDrag: false
    })
  })

  it('can trigger an endTransition after transitioning', () => {
    const transitioningState = appReducer(
      undefined,
      appActions.startTransition()
    )
    expect(appReducer(transitioningState, appActions.endTransition())).toEqual({
      ...INITIAL_STATE,
      isTransitioning     : false,
      transitionCompleted : true
    })
  })

  it('works after multiple actions it resets to the initial state', () => {
    let testState = appReducer(undefined, appActions.makeSticky(4, {}))
    testState = appReducer(testState, appActions.startTransition())
    expect(appReducer(testState, appActions.endTransition())).toEqual({
      ...INITIAL_STATE,
      transitionCompleted: true
    })
  })
})
