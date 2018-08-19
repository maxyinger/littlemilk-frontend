import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'

const createStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware()
  /* ================================================
  =            Middleware Configuration            =
  ================================================ */
  const middleware = [sagaMiddleware]

  /* =======================================
  =            Store enhancers            =
  ======================================= */
  const enhancers = []
  let composeEnhancers = compose

  if (__DEV__) {
    if (typeof window.__REDUX_DEVTOLLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOLLS_EXTENSION_COMPOSE__
    }
  }

  /* =========================================================
  =            Store Instantiation and HMR Setup            =
  ========================================================= */
  const store = createReduxStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  return store
}

export default createStore
