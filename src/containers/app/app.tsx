import { h, Component } from 'preact'
import { Router, route } from 'preact-router'

import Bootstrap from '@containers/bootstrap/bootstrap'
import MobxProvider from '@state/mobx-provider'
import BaseRoute from '@routes/base-route'

export default class App extends Component<{}, {}> {
  render () {
    return (
      <MobxProvider>
        <Bootstrap />
        <Router>
          <BaseRoute path='/' />
          <div path='/home'>Home</div>
        </Router>
      </MobxProvider>
    )
  }
}

