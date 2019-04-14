import { h, Component } from 'preact'
import { route } from 'preact-router'
import { inject } from 'mobx-preact'

import { CharacterModel } from '@assets/models'
import ApiService, { MissingTokenError, UnauthorizedError } from '@services/api-service'
import { TokenProps } from '@state/token-store'
import { CharacterProps } from '@state/character-store'

type Props = TokenProps & CharacterProps

@inject('token', 'character')
export default class Bootstrap extends Component<Props> {
  render () { return <span /> }

  componentWillMount () {
    const valid = this.checkToken()
    if (valid) { this.loadCharacters() }
  }

  private checkToken () {
    if (!this.props.token!.token) {
      route('/set-token')
      return
    }
    return true
  }

  private loadCharacters () {
    ApiService.getCharacterList().then(
      this.storeCharacters,
      this.handleDataLoadError)
  }

  private storeCharacters = (data: CharacterModel[]) => {
    this.props.character!.list = data
    if (window.location.pathname === '/') { route('/characters') }
  }

  private handleDataLoadError (err: Error) {
    if (err instanceof MissingTokenError) {
      route('/set-token')
    } else if (err instanceof UnauthorizedError) {
      route('/bad-token')
    }
  }
}
