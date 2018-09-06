import { combineReducers } from 'redux'
import appReducer from '../app/duck'

const rootReducer = combineReducers({
  app: appReducer
})

export default rootReducer
