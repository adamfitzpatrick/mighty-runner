import { h, Component } from 'preact'

import { CharacterModel } from '@assets/models'
import ApiService, { ApiServiceResponse } from '@services/api.service'
import AppBar from '@components/app-bar';

import * as styles from './app.scss'
import CharacterList from '@components/character-list';
import MissingToken from '@components/missing-token';
import CharacterSheet from '@components/character-sheet';

export interface AppStateModel {
  apiServiceReady: boolean,
  lastErrorResponse?: ApiServiceResponse
  characters?: CharacterModel[],
  currentCharacter?: CharacterModel,
  setToken: (token: string) => Promise<ApiServiceResponse | void>,
  refreshCharacterList: () => Promise<ApiServiceResponse | void>,
  setCurrentCharacter: (character: CharacterModel) => void
}

class App extends Component<{}, AppStateModel> {
  apiService: ApiService

  constructor () {
    super()
    this.apiService = new ApiService()
    this.state = {
      apiServiceReady: !!this.apiService.token,
      setToken: this.setToken,
      refreshCharacterList: this.refreshCharacterList,
      setCurrentCharacter: this.setCurrentCharacter
    }
    this.refreshCharacterList()
  }

  setToken = (token: string) => {
    this.apiService = new ApiService(token)
    return this.refreshCharacterList()
  }

  refreshCharacterList = () => {
    return this.apiService.getCharacterList()
      .then(characters => {
        this.setState({ characters, apiServiceReady: true }, () => this.checkRouteForCurrentCharacter())
      })
      .catch(response => {
        if (response && response.status === 401) {
          this.setState({ apiServiceReady: false })
        }
        if (response && response.status > 400) {
          this.setState({ lastErrorResponse: response })
        }
        return response
      })
  }

  setCurrentCharacter = (currentCharacter: CharacterModel) => {
    this.setState({ currentCharacter }, () => { window.location.pathname = `/${currentCharacter.id}` })
  }

  checkRouteForCurrentCharacter = () => {
    const currentCharacter = this.state.characters.find(character => character.id === window.location.pathname.slice(1))
    if (currentCharacter) {
      this.setState({ currentCharacter })
    }
  }

  selectMainComponent () {
    if (this.state.apiServiceReady && !this.state.currentCharacter) {
      return <CharacterList {...this.state} />
    } else if (!this.state.currentCharacter) {
      return <MissingToken {...this.state} />
    } else {
      return <CharacterSheet {...this.state} />
    }
  }

  render () {
    return (
      <span>
        <AppBar />
        <main className={styles.main}>
          {this.selectMainComponent()}
        </main>
      </span>
    )
  }
}

export default App
