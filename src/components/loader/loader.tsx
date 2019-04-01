import { h, Component } from 'preact'

import { Colors } from '@assets/models'
import Logo from '@components/logo'
import Glitch from '@components/glitch';
import Crt from '@components/crt'
import { infoGenerator, constantGenerator } from './content-generators'

import * as styles from './loader.scss'

interface State {
  lines: string[]
  markingTime: number
}
export default class Loader extends Component<{}, State> {
  static MAX_LINES = 100
  static MARK_TIME_FRAMES = 120

  state: State = {
    lines: [],
    markingTime: 0
  }

  render () {
    return (
        <div className={styles.loader}>
          <Glitch>
            <div className={ styles.terminal }>
              <Logo fill={Colors.colorRed} />
              <h1 className={styles.title}>
                Mighty<br />Runner
              </h1>
              <h2 className={styles.standby}>
                Standby...Loading...
              </h2>
              <div className={styles.tinyCode}>
                { this.getContentMarkup() }
              </div>
              <Crt />
            </div>
          </Glitch>
        </div>
    )
  }

  componentDidMount () {
    this.updateLines()
  }

  private updateLines = () => {
    if (this.state.lines.length < Loader.MAX_LINES) {
      this.setState((prevState: State) => {
        return { lines: prevState.lines.concat([ this.generateContent(prevState.lines) ])}
      })
    } else if (this.state.markingTime < Loader.MARK_TIME_FRAMES) {
      this.setState((prevState: State) => ({ markingTime: prevState.markingTime + 1 }))
    } else {
      this.resetContent()
    }
    requestAnimationFrame(this.updateLines)
  }

  private generateContent = (lines: string[]): string => {
    const event = Math.floor(Math.random() * 5)
    switch (event) {
      case 0:
      case 1:
        return lines[lines.length - 1]
      case 2:
      return constantGenerator(10)
      case 3:
      case 4:
        return infoGenerator(20)
    }
  }

  private resetContent = () => {
    this.setState({
      lines: [],
      markingTime: 0
    })
  }

  private getContentMarkup () {
    return this.state.lines.map((line: string, index: number) => <div key={index}>{ line }</div>)
  }
}
