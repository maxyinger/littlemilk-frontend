import {
  applyMiddleware,
  compose,
  createStore as createReduxStore
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'

const createStore = (initialState = {}) => {
  /**
   * * Middleware Configuration
   */
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware]

  /**
   * * Store enhancers
   */
  const enhancers = []
  let composeEnhancers = compose

  if (__DEV__) {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  /**
   * * Store Instantiation and HMR Setup
   */
  const store = createReduxStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware), ...enhancers)
  )
  sagaMiddleware.run(rootSaga)

  return store
}

export default createStore
