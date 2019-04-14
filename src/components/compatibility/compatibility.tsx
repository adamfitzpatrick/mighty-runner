import { h, Component } from 'preact'

import checkDisplay from './check-display'

import * as styles from './compatibility.scss'

interface State {
  violationMessages: string[]
}
export default class Compatibility extends Component<{}, State> {
  state: State = {
    violationMessages: []
  }

  render () {
    if (this.state.violationMessages.length) {
      return (
        <div className={styles.compatibility}>
          { this.renderViolations() }
        </div>
      )
    }
    return null
  }

  componentWillMount () {
    this.analyze()
    window.addEventListener('resize', () => setTimeout(this.analyze, 500))
  }

  private renderViolations () {
    return this.state.violationMessages.map(message => <div key={message}>{ message }</div>)
  }

  private analyze = () => {
    function notEmpty (message: string | undefined): message is string { return !!message }
    const violationMessages = [
      checkDisplay()
    ].filter(notEmpty)
    this.setState({ violationMessages })
  }
}
