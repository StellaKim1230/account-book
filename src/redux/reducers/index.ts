import { combineReducers } from 'redux'
import MainStatsReducer from './mainStats'

const reducers = combineReducers({
  mainStats: MainStatsReducer,
})

export default reducers
