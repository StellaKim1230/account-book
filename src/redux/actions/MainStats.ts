
import { Dispatch } from 'redux'

import {
  GET_MAIN_STATS,
  GET_MAIN_STATS_SUCCESS,
  GET_MAIN_STATS_FAILED
} from './actionTypes'
import { MainStats } from '../../pages/MainPage'
import { getApiHandler } from '../../utils/api'

export const getMainStats = () => (dispatch: Dispatch) => {
  dispatch({
    type: GET_MAIN_STATS,
  })

  getApiHandler('/stats', 'GET')
    .then((response) => {
      dispatch(getMainStatsSuccess(response))
    })
    .catch(() => dispatch(getMainstatsFailed()))
}

export const getMainStatsSuccess = (payload: MainStats): ReduxAction => ({
  type: GET_MAIN_STATS_SUCCESS,
  payload,
})

export const getMainstatsFailed = () => ({
  type: GET_MAIN_STATS_FAILED,
})
