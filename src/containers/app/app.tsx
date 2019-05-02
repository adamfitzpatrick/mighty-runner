import { h, Component } from 'preact'
import { Router, route } from 'preact-router'

import Bootstrap from '@containers/bootstrap/bootstrap'
import MobxProvider from '@state/mobx-provider'
import BaseRoute from '@routes/base-route'
import DigiGridBackground from '@containers/digi-grid-background'

export default class App extends Component<{}, {}> {
  render () {
    return (
      <MobxProvider>
        <DigiGridBackground />
        <Bootstrap />
        <Router>
          <BaseRoute path='/' />
          <div path='/home'>Home</div>
        </Router>
      </MobxProvider>
    )
  }
}

