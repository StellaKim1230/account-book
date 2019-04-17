
import { Dispatch } from 'redux'

import {
  GET_MAIN_STATS,
  GET_MAIN_STATS_SUCCESS,
  GET_MAIN_STATS_FAILED
} from './actionTypes'
import { getApiHandler } from '../../utils/api'

export const getMainStats = () => async(dispatch: Dispatch) => {
  dispatch({
    type: GET_MAIN_STATS,
  })

  try {
    const { data, result } = await getApiHandler('/stats', 'GET') as ApiResponse
    if (result) return dispatch(getMainStatsSuccess(data))
    dispatch(getMainstatsFailed())
  } catch (e) {
    dispatch(getMainstatsFailed())
  }
}

export const getMainStatsSuccess = (payload: any): ReduxAction => ({
  type: GET_MAIN_STATS_SUCCESS,
  payload,
})

export const getMainstatsFailed = () => ({
  type: GET_MAIN_STATS_FAILED,
})
