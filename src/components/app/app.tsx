import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import configureStore from '@state/store'

const store = configureStore()

import DataMock from '@containers/data-mock'
import CharacterFormMock from '@containers/character-form-mock'

export default function App () {
  return (
    <Provider store={store}>
      <Router>
        <Route path='/' exact component={DataMock} />
        <Route path='/form/:characterId' exact component={CharacterFormMock} />
      </Router>
    </Provider>
  )
}
