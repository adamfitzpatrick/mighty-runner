import { h, Component } from 'preact'
import classnames from 'classnames'

import * as styles from './glitch.scss'

interface GlitchProps {
  children: JSX.Element | JSX.Element[]
}

interface GlitchState {
  classes: string
}

export default class Glitch extends Component<GlitchProps, GlitchState> {
  render () {
    if ((this.props.children as JSX.Element[]).length > 1) {
      const children = (this.props.children as JSX.Element[])
      return (
        <div className={styles.glitch}>
          {children[0]}
          <div className={classnames(styles.scanGlitch, styles.scanGlitch1, styles.preDefined)}>{children[1]}</div>
          <div className={classnames(styles.scanGlitch, styles.scanGlitch2, styles.preDefined)}>{children[2]}</div>
        </div>
      )
    } else {
      return (
        <div className={styles.glitch}>
          {this.props.children}
          <div className={styles.scanGlitch1}>{this.props.children}</div>
          <div className={styles.scanGlitch2}>{this.props.children}</div>
        </div>
      )
    }
  }
}
