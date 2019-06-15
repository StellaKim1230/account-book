
import { Dispatch } from 'redux'
import { Omit } from 'utility-types'

import {
  GET_MAIN_STATS,
  GET_MAIN_STATS_SUCCESS,
  GET_MAIN_STATS_FAILED
} from './actionTypes'
import { apiHandler } from '../../utils/api'

import { ReduxAction } from '../../types'
import { MainStatsReducer } from '../../types/model'

type MainStats = Omit<MainStatsReducer, 'isLoading'>

export const getMainStats = () => async (dispatch: Dispatch) => {
  dispatch({
    type: GET_MAIN_STATS,
  })

  try {
    const { data, result } = await apiHandler<MainStats>('/stats')
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
