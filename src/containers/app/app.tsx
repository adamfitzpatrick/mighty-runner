import { h, Component } from 'preact'
import { Router, route } from 'preact-router'

import Bootstrap from '@containers/bootstrap/bootstrap'
import DigiGridBackground from '@components/digi-grid-background'
import Logo from '@components/logo'
import Compatibility from '@components/compatibility'
import MobxProvider from '@state/mobx-provider'
import BaseRoute from '@routes/base-route'
import SetTokenRoute from '@routes/set-token-route'
import CharactersRoute from '@routes/characters-route'
import CharacterDetailRoute from '@routes/character-detail-route'

export default class App extends Component<{}, {}> {
  render () {
    return (
      <MobxProvider>
        <Bootstrap />
        <DigiGridBackground />
        <Router>
          <BaseRoute path={'/'} />
          <CharactersRoute path={'/characters'} />
          <CharacterDetailRoute path={'/character-detail/:characterId'} />
          <SetTokenRoute path={'/set-token'} />
          <SetTokenRoute path={'/bad-token'} />
        </Router>
        <Logo />
        <Compatibility />
      </MobxProvider>
    )
  }
}

