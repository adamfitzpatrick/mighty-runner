import { h } from 'preact'

import { CharacterModel } from '@assets/models'

import CharacterCard from '@components/character-card'

import * as styles from './character-list.scss'

interface Props {
  characters: CharacterModel[]
}

function getCharacterCards (characters: CharacterModel[]) {
  return characters.map(character => <CharacterCard character={character} />)
}

export default function CharacterList ({ characters }: Props) {
  return (
    <div className={styles.characterList}>
      { getCharacterCards(characters) }
    </div>
  )
}
