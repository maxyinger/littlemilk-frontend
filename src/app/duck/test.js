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
    expect(appReducer(undefined, appActions.startTransition())).toEqual({
      ...INITIAL_STATE,
      isTransitioning: true
    })
  })

  it('can trigger an endTransition after transitioning', () => {
    const transitioningState = appReducer(
      undefined,
      appActions.startTransition()
    )
    expect(appReducer(transitioningState, appActions.endTransition())).toEqual({
      ...INITIAL_STATE,
      isTransitioning: false
    })
  })

  it('after transitioning it resets to the initial state', () => {
    let testState = appReducer(undefined, appActions.makeSticky(4, {}))
    testState = appReducer(testState, appActions.startTransition())
    expect(appReducer(testState, appActions.endTransition())).toEqual(
      INITIAL_STATE
    )
  })
})
