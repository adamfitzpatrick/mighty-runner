import { h, Component } from 'preact'
import classnames from 'classnames'

import { AppStateModel } from '@components/app'

import * as styles from './missing-token.scss'
import Input from '@components/input';

interface MissingTokenState {
  tokenInput: string,
  badLoginAttempted: boolean
}

class MissingToken extends Component<AppStateModel, MissingTokenState>  {
  constructor (props: AppStateModel) {
    super(props)
    this.state = {
      tokenInput: '',
      badLoginAttempted: false
    }
  }

  handleTokenInput = (event: KeyboardEvent) => {
    this.setState({ tokenInput: (event.target as HTMLInputElement).value })
  }

  setToken = () => {
    this.props.setToken(this.state.tokenInput).then(() => {
      console.log(this.props)
      if (this.props.lastErrorResponse.status === 401) { this.setState({ badLoginAttempted: true })}
    })
  }

  getErrorMessage = () => {
    const { lastErrorResponse } = this.props
    return (lastErrorResponse && `${lastErrorResponse.status} ${lastErrorResponse.statusText}`) || '&nbsp;'
  }

  renderTokenInputBlock = () => {
    return (
      <div className={styles.inputGroup}>
        <Input
          label="Token"
          handler={this.handleTokenInput}
          value={this.state.tokenInput}
          message={this.getErrorMessage()}
          invalid={this.state.badLoginAttempted}
        />
        <div>Bad login: { this.state.badLoginAttempted }</div>
        <button onClick={() => this.setToken()}>Set Token</button>
      </div>
    )
  }

  render () {
    return (
      <div className={styles.missingToken}>
        <h2>Your API access token appears to be missing or incorrect.</h2>
        <p>
          You may enter it below if you know it, and it will be stored for you so you
          don't have to enter it again.  If you don't have one, ask Adam to give you one. If you
          don't know Adam, then perhaps you're in the wrong place...
        </p>
        {this.renderTokenInputBlock()}
      </div>
    )
  }
}

export default MissingToken
