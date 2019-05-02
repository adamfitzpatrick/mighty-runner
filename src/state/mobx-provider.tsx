
import { h } from 'preact'
import { Provider } from 'mobx-preact'

import { TokenProps, token } from '@state/token-store'
import { CharacterProps, character } from '@state/character-store'
import { AppStateProps, appState } from '@state/app-state-store'

interface Props {
  children?: JSX.Element[],
}

type ProviderProps =
  Required<TokenProps> &
  Required<CharacterProps> &
  Required<AppStateProps>

const stores: ProviderProps = {
  token,
  character,
  appState
}

const MobxProvider = ({ children }: Props) => (
  <Provider {...stores}>
    {children}
  </Provider>
)

export default MobxProvider
