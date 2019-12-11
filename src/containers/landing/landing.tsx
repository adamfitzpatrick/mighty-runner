import * as React from 'react'

import * as styles from './landing.scss'
import Header from '@components/header'
import MainSidebar from '@components/main-sidebar'
import { Character } from '@models'
import { useDispatch, useSelector } from 'react-redux'
import { loadCharactersCreator, loadCharacterCreator } from '@state/actions'
import { AppState } from '@state/default-state'
import Summary from '@components/summary'
import NewCharacter from '@containers/new-character'

interface Props {}

function getCharacterSummaries (characters: Character[]) {
  return characters.map(character => <Summary key={character.id} character={character} />)
}

export default function Landing (props: Props) {
  const dispatch = useDispatch()
  const characters = useSelector((state: AppState) => state.characters)
  loadCharacterCreator(dispatch)('1')

  if (!characters) {
    loadCharactersCreator(dispatch)()
    return null
  }

  let favorite = { id: '1', personalData: { name: 'Melodium Flynn' } } as Character
  let newest = { id: '2', personalData: { name: 'Three Fathoms Down' } } as Character
  let recent = [
    favorite,
    newest,
    { id: '3', personalData: { name: 'This One' } },
    { id: '4', personalData: { name: 'That One' } },
    { id: '5', personalData: { name: 'T\'Other One' } }
  ] as Character[]

  return <div className={styles.landing}>
    <Header />
    <MainSidebar
      count={characters.length}
      favorite={favorite}
      newest={newest}
      recent={recent}
    />
    <div className={styles.summaryList}>
      {getCharacterSummaries(characters)}
    </div>
    <NewCharacter />
  </div>
}
