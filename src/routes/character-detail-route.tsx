import { h } from 'preact'

import Header from '@components/header'
import CharacterDetail from '@containers/character-detail'

interface Props {
  path: string,
  characterId?: string
}


export default function CharacterDetailRoute (props: Props) {
  return (
    <div>
      <Header />
      <CharacterDetail />
    </div>
  )
}
