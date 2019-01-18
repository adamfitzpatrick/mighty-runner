import { h, Component } from 'preact'
import classnames from 'classnames'

import * as styles from './app-bar.scss'

export default function AppBar () {
  return (
    <header className={styles.header}>
      <h6 className={styles.title}>Mighty Runner</h6>
    </header>
  )
}
