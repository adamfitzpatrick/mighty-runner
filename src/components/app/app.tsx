import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import configureStore from '@state/store'

const store = configureStore()

import CharacterFormMock from '@containers/character-form-mock'
import Bootstrap from '@containers/bootstrap'
import Error from '@containers/error'
import Landing from '@containers/landing'

export default function App () {
  return (
    <Provider store={store}>
      <Bootstrap />
      <Error />
      <Router>
        <Route path='/' exact component={Landing} />
        <Route path='/form/:characterId' exact component={CharacterFormMock} />
      </Router>
    </Provider>
  )
}
