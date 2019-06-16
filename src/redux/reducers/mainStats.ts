import {
  GET_MAIN_STATS,
  GET_MAIN_STATS_SUCCESS,
  GET_MAIN_STATS_FAILED
} from '../actions/actionTypes'

import { MainStatsReducer } from '../../types/model'
import { ReduxAction } from '../../types'

const initialState: MainStatsReducer = {
  amountByCategory: [],
  amountPerRange: {
    month: '',
    groupBy: '',
    balances: [],
  },
  balanceByAccount: [],
  isLoading: false,
}

const MainStatsReducer = (state: MainStatsReducer = initialState, action: ReduxAction) => {
  switch (action.type) {
    case GET_MAIN_STATS:
      return {
        ...state,
        isLoading: true,
      }
    case GET_MAIN_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      }
    case GET_MAIN_STATS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}

export default MainStatsReducer
