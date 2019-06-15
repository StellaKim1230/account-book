// Decalre global typescript types.

import { MainStatsReducer } from './model'

declare var DEV: boolean

export interface ReduxAction {
  type: string
  payload?: any
}

export interface ReduxState {
  mainStats: MainStatsReducer
}

export interface ApiResponse<T> {
  result: boolean
  data?: T
  errorCode?: number
}
