// Decalre global typescript types.

declare var DEV: boolean

declare interface ReduxAction  {
  type: string,
  payload?: any,
}

declare interface SampleReducer  {
  reduxWorker: boolean
}
