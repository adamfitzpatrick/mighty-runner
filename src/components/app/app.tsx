import { h, Component } from 'preact'
import { Router, route } from 'preact-router'
import Match from 'preact-router/match'

import DigiGridBackground from '@components/digi-grid-background'
import Logo from '@components/logo'
import Header from '@components/header'
import CharacterList from '@components/character-list'
import Loader from '@components/loader'

import ApiService from '@services/api.service'

import { CharacterModel } from '@assets/models'

interface MatchParams {
  matches: boolean
}

interface AppState {
  characters: CharacterModel[],
}

export default class App extends Component<{}, AppState> {
  apiService: ApiService
  state: AppState = {
    characters: []
  }

  constructor () {
    super()
    this.apiService = new ApiService('5ZBbOZJtFNs2esIVciyJ')
  }

  renderBackground = ({ matches }: MatchParams) => {
    return <DigiGridBackground clear={matches} />
  }

  renderLogo = ({ matches }: MatchParams) => {
    return <Logo header={!matches} />
  }

  render () {
    return (
      <div>
        <Match path='/'>
          { this.renderBackground }
        </Match>
        <Match path='/'>
          { this.renderLogo }
        </Match>
        <Router>
          <Loader path={'/'} />
          <div path='/characters'>
            <Header />
            <CharacterList characters={this.state.characters} />
          </div>
        </Router>
      </div>
    )
  }

  componentDidMount () {
    if (!this.state.characters.length) { route('/', true) }
    this.apiService.getCharacterList().then(characters => {
      this.setState({ characters }, () => {
        route('/characters')
      })
    })
  }
}

