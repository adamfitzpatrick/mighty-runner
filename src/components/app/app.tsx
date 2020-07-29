import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// TODO OH MY GOD KILL THIS
localStorage.setItem('mighty_runner_api_access_token', '5ZBbOZJtFNs2esIVciyJ')

import configureStore from '@state/store'

const store = configureStore()

import CharacterFormMock from '@containers/character-form-mock'
import Bootstrap from '@containers/bootstrap'
import Error from '@containers/error'
import Landing from '@containers/landing'
import Detail from '@containers/detail'

export default function App () {
  return (
    <Provider store={store}>
      <Bootstrap />
      <Error />
      <Router>
        <Route path='/' exact component={Landing} />
        <Route path='/form/:characterId' exact component={CharacterFormMock} />
        <Route path='/detail/:characterId' exact component={Detail} />
      </Router>
    </Provider>
  )
}
