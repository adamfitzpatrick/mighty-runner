
import { h } from 'preact'
import { Provider } from 'mobx-preact'

import { TokenProps, token } from '@state/token-store'
import { CharactersProps, characters } from '@state/characters-store'
import { ActiveCharacterProps, activeCharacter } from '@state/active-character-store'

type Props = {
  children: JSX.Element | JSX.Element[]
}

type ProviderProps =
  Required<TokenProps> &
  Required<CharactersProps> &
  Required<ActiveCharacterProps>

const stores: ProviderProps = {
  token,
  characters: characters,
  activeCharacter: activeCharacter
}

const MobxProvider = ({ children }: Props) => (
  <Provider {...stores}>
    {children}
  </Provider>
)

export default MobxProvider
