import { h, Component } from 'preact'
import { Router } from 'preact-router'
import { Match } from 'preact-router/match'

import Bootstrap from '@containers/bootstrap/bootstrap'
import MobxProvider from '@state/mobx-provider'
import BaseRoute from '@routes/base-route'
import Background from '@containers/background'
import Header from '@components/header'
import DetailRoute from '@routes/detail-route';

export default class App extends Component<{}, {}> {
  render () {
    return (
      <MobxProvider>
        <Background />
        <Bootstrap />
        <Router>
          <Match path='/'>
            {
              () => <span>
                <BaseRoute path='/' />
                <Header />
              </span>
            }
          </Match>
          <Match path='/detail/:id'>
            {
              () => <span>
                <DetailRoute id='1'/>
                <Header showName />
              </span>
            }
          </Match>
        </Router>
      </MobxProvider>
    )
  }
}

