import { h, Component } from 'preact'
import classnames from 'classnames'

import Glitch from '@components/glitch'
import DirectiveTerminal from './directive-terminal'
import InfoTerminal from './info-terminal'

import * as shruggie from '@assets/images/neon-shruggie.jpg'

import * as styles from './background.scss'

interface HackerBackgroundState {
  rolled: boolean
}

export default class HackerBackground extends Component<{}, HackerBackgroundState> {
  constructor () {
    super()
    this.state = { rolled: false }
  }

  renderGlitchableLayer (level?: 0 | 1 | 2) {
    const classes = classnames(
      styles.backgroundContent,
      { [styles.glitched1]: level === 1 },
      { [styles.glitched2]: level === 2 }
    )
    return (
      <div className={classes}>
        <h2 className={styles.redline}>&gt; Analyzing threat...<span className={styles.redlineReverse}>lethal</span></h2>
        <div className={classnames(styles.rightWindow)}>
          <InfoTerminal />
        </div>
        <div className={classnames(styles.leftWindow)}>
          <InfoTerminal />
        </div>
        <div className={classnames(styles.objectWindow)}>
          <DirectiveTerminal />
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className={styles.background}>
        <Glitch>
          { this.renderGlitchableLayer(0) }
          { this.renderGlitchableLayer(1) }
          { this.renderGlitchableLayer(2) }
        </Glitch>
      </div>
    )
  }
}
