import { h, Component } from 'preact'
import { inject } from 'mobx-preact'

import { CharacterModel } from '@assets/models'

import CharacterCard from '@components/character-card'

import * as styles from './character-list.scss'
import { CharacterProps } from '@state/character-store';

interface Props extends CharacterProps {}

@inject('character')
export default class CharacterList extends Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  render () {
    const characters = this.props.character!.list || []
    return (
      <div className={styles.characterList} id='foofoo'>
        { this.getCharacterCards(characters) }
      </div>
    )
  }

  private getCharacterCards (characters: CharacterModel[]) {
    return characters.map(character => <CharacterCard character={character} />)
  }
}
