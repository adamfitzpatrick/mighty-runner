import { h, Component } from 'preact'

import {randomKeyword, randomInteger, constantGenerator } from './content-generators'
import * as styles from './background.scss'

interface DirectiveTerminalProps {
  refreshRate?: number
}

interface DirectiveTerminalState {
  intercepted: string,
  constantLines: JSX.Element[]
}

export default class DirectiveTerminal extends Component<DirectiveTerminalProps, DirectiveTerminalState> {
  constructor(props: DirectiveTerminalProps) {
    super(props)
    this.state = {
      intercepted: randomKeyword().toUpperCase(),
      constantLines: this.constantLineGenerator(randomInteger(6))
    }
  }

  constantLineGenerator (lineCount: number): JSX.Element[] {
    return new Array(lineCount).fill(null).map(() => <div>{ constantGenerator(5) }</div>)
  }

  refreshContent = () => {
    setInterval(() => {
      this.setState({
        intercepted: randomKeyword().toUpperCase(),
        constantLines: this.constantLineGenerator(randomInteger(6))
      })
    }, this.props.refreshRate || 3000)
  }

  render () {
    return (
      <div className={styles.terminal}>
        <div className={styles.terminalHeader}>OBJECT: <span className={styles.reverse}>0{randomInteger(10000)}</span></div>
        <div>// {this.state.intercepted} intercepted</div>
        { this.state.constantLines }
      </div>
    )
  }

  // componentDidMount () { this.refreshContent() }

  // componentDidUpdate () { this.refreshContent() }
}
