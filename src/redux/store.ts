import { applyMiddleware, compose, createStore, Middleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import reducers from './reducers'

const DEV = process.env.NODE_ENV === 'development'

const composeEnhancer: <T>(a: T) => T = DEV ? composeWithDevTools : compose

const middlewares: Middleware[] = [
  thunk,
]

export const configureStore = (initialState: any) => createStore(
  reducers,
  initialState,
  composeEnhancer(
    applyMiddleware(...middlewares)
  )
)
