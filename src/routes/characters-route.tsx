import { h } from 'preact'
import Header from '@components/header'
import CharacterList from '@containers/character-list'

interface Props { path: string }

export default function CharactersRoute (props: Props) {
  return (
    <div>
      <Header />
      <CharacterList />
    </div>
  )
}
