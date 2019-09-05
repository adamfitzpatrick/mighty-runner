import * as React from 'react'
import { Provider } from 'react-redux'

import configureStore from '@state/store'

const store = configureStore()

import DataMock from '@containers/data-mock'

export default function App () {
  return (
    <Provider store={store}>
      <DataMock />
    </Provider>
  )
}
