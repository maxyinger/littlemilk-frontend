import { combineReducers } from 'redux'
import appReducer from '../app/duck'
import homeReducer from '../app/home/duck'

const rootReducer = combineReducers({
  app  : appReducer,
  home : homeReducer
})

export default rootReducer
