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
})
