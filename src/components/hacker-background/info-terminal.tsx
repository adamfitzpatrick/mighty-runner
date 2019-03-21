import { h, Component } from 'preact'
import classnames from 'classnames'

import { infoGenerator } from './content-generators'
import * as styles from './background.scss'

interface InfoTerminalProps {
  refreshRate?: number
  fixedHeight?: string
}

interface InfoTerminalState {
  content: JSX.Element[]
}

interface IndexedStyles {
  [className: string]: string
}

const LINE_COUNT = 10

export default class InfoTerminal extends Component<InfoTerminalProps, InfoTerminalState> {
  static MAX_LINES = 10
  delay: number

  constructor (props: InfoTerminalProps) {
    super(props)
    this.delay = Math.random() * 3
    this.state = {
      content: this.infoLineGenerator(InfoTerminal.MAX_LINES)
    }
  }

  infoLineGenerator (lineCount: number): JSX.Element[] {
    return new Array(lineCount).fill(null).map((value: null, index: number) => {
      const classes = classnames(
        { [styles.reverse]: Math.random() > 0.5 },
        (styles as IndexedStyles)[`rolling${index}`]
      )
      const style = {
        animationDelay: `${this.delay}s`
      }
      return (
        <span className={classes} style={style}>{ infoGenerator(5) }<br /></span>
      )
    })
  }

  refreshContent = () => {
    setInterval(
      () => this.setState({ content: this.infoLineGenerator(InfoTerminal.MAX_LINES) }),
      this.props.refreshRate || 3000
    )
  }

  render () {
    return (
      <div
        className={classnames(styles.terminal, styles.terminalFullBleedRight)}
        style={{ height: this.props.fixedHeight }}
      >
        { this.state.content }
      </div>
    )
  }

  // componentDidMount () { this.refreshContent() }

  // componentDitUpdate () { this.refreshContent() }
}
