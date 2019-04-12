import { h, Component } from 'preact'
import { Router } from 'preact-router'

import DigiGridBackground from '@components/digi-grid-background'
import Logo from '@components/logo'
import MobxProvider from '@state/mobx-provider'
import BaseRoute from '@routes/base-route'
import SetTokenRoute from '@routes/set-token-route'
import CharactersRoute from '@routes/characters-route'



export default class App extends Component<{}, {}> {
  render () {
    return (
      <MobxProvider>
        <DigiGridBackground />
        <Logo />
        <Router>
          <BaseRoute path={'/'} />
          <CharactersRoute path={'/characters'} />
          <SetTokenRoute path={'/set-token'} />
          <SetTokenRoute path={'/bad-token'} />
        </Router>
      </MobxProvider>
    )
  }

  componentWillMount () {}

  componentDidMount () {}
}

