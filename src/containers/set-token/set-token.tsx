import { h, Component } from 'preact'
import { inject, observer } from 'mobx-preact'
import { route } from 'preact-router'

import Button from '@components/button'
import Input from '@components/input'
import { ExpandableGroup, Expandable } from '@components/expandable'

import * as styles from './set-token.scss'
import { TokenProps } from '@state/token-store'

interface Props extends TokenProps {
  badToken?: boolean
}

interface State {
  tokenInput: string
  expanded: boolean
}

@inject('token')
@observer
export default class SetToken extends Component<Props, State> {
  state = {
    tokenInput: this.props.token!.token || '',
    expanded: false
  }

  toggleExpander = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render () {
    return (
      <div className={styles.setToken}>
        <div className={styles.terminal}>
          <h1 className={styles.title}>// TOKEN REQUIRED //</h1>
          { this.props.badToken ? <h3 class={styles.error}>Invalid token was provided</h3> : null }
          <ExpandableGroup exclusive className={styles.explanations}>
            <Expandable>
              <h2 className={styles.explanationHeader}>What is a token?</h2>
              <p className={styles.explanationParagraph}>
                A token is the simple form of authentication this application uses.
                Anyone with a token has full access to the resources associated with
                that token.  Tokens may be obtained from the app developer.
              </p>
            </Expandable>
            <Expandable>
              <h2 className={styles.explanationHeader}>Can I get a demo token?</h2>
              <p className={styles.explanationParagraph}>
                Yes.  Click the <b>Demo</b> button below.  Demo tokens give you access
                to a default set of resources, which you can modify and store locally.
                Your changes will not propagate across multiple devices, and should you
                clear your browser storage on this device, changes will be lost.
              </p>
            </Expandable>
          </ExpandableGroup>
          <form>
            <Input
              value={this.state.tokenInput}
              onInput={this.storeInputToken}
              label='Access Token'
              className={styles.input}
            />
            <div className={styles.actions}>
              <Button text='enter' primary onClick={this.setToken} type='submit' />
              <Button text='Demo' onClick={() => { /* no-op */ }} />
            </div>
          </form>
        </div>
      </div>
    )
  }

  private storeInputToken = (event: InputEvent) => {
    this.setState({ tokenInput: event.target.value })
  }

  private setToken = () => {
    this.props.token!.token = this.state.tokenInput
    route('/')
  }
}
