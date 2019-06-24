
import { h } from 'preact'
import { Provider } from 'mobx-preact'

import { TokenProps, token } from '@state/token-store'
import { CharactersProps, characters } from '@state/characters-store'
import { CharacterProps, character } from '@state/character-store'

type Props = {
  children: JSX.Element | JSX.Element[]
}

type ProviderProps =
  Required<TokenProps> &
  Required<CharactersProps> &
  Required<CharacterProps>

const stores: ProviderProps = {
  token,
  characters: characters,
  character: character
}

const MobxProvider = ({ children }: Props) => (
  <Provider {...stores}>
    {children}
  </Provider>
)

export default MobxProvider
