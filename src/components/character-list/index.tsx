import { h, Component } from 'preact'

import { AppStateModel } from '@components/app'
import { CharacterModel } from '@assets/models'
import ApiService from '@services/api.service'
import CharacterCard from '@components/character-card'

import * as styles from './character-list.scss'

interface CharacterListState {
  characters: CharacterModel[]
}

class CharacterList extends Component<AppStateModel, CharacterListState> {
  generateCharacterCards = () => {
    return this.props.characters.map((character: CharacterModel) => {
     return <CharacterCard character={character} select={() => this.props.setCurrentCharacter(character)} />
    })
  }

  nothingToShow = () => {
    return (
      <div className={styles.nothingToShow}>
        It looks like you haven't created any characters yet.
        <button>Create one now!</button>
      </div>
    )
  }

  render () {
    return (
      <div className={styles.characterList}>
        {
          !this.props.characters || this.props.characters.length === 0 ?
            this.nothingToShow() :
            this.generateCharacterCards()
          }
      </div>
    )
  }
}

export default CharacterList
