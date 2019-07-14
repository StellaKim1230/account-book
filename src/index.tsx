import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from './redux/store'

import App from './containers/App'

import './index.scss'

const rootElement = document.getElementById('root')
const store = configureStore({
  // ...initialize any prepared state
})

if (!rootElement) throw Error ('Dom element div#root not found')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
