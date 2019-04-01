import { h, Component } from 'preact'

import DigiGridBackground from '@components/digi-grid-background'
import Header from '@components/header'
import CharacterList from '@components/character-list'
import { Router, Route } from '@components/router'
import Loader from '@components/loader'

import * as styles from './app.scss'
import { CharacterModel } from '@assets/models';

interface AppState {
  characters: CharacterModel[]
}

export default class App extends Component<{}, AppState> {
  state: AppState = {
    characters: []
  }

  render () {
    return (
      <Router>
        <DigiGridBackground clear={ Router.isCurrentRoute('/') }/>
        <Route path='/' component={ Loader } />
        <Route path='/characters' component={ Header } />
        <Route path='/characters' component={ CharacterList }/>
      </Router>
    )
  }
}

