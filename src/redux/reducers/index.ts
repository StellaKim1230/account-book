import { combineReducers } from 'redux'
import MainStatsReducer from './maiStats'

const reducers = combineReducers({
  mainStats: MainStatsReducer,
})

export default reducers
