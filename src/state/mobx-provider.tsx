
import { h } from 'preact'
import { Provider } from 'mobx-preact'

import { TokenProps, token } from '@state/token-store'
import { CharacterProps, character } from '@state/character-store'

interface Props {
  children?: JSX.Element[],
}

type ProviderProps = Required<TokenProps> &
  Required<CharacterProps>

const stores: ProviderProps = {
  token,
  character
}

const MobxProvider = ({ children }: Props) => (
  <Provider {...stores}>
    {children}
  </Provider>
)

export default MobxProvider
