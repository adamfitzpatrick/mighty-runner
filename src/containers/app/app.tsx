import { h } from 'preact'

import Stat from '@components/stat'
import * as styles from './app.scss'
import SmartStat from '@containers/smart-stat';

export default function App () {
  return (
    <div className={styles.app}>
      <SmartStat />
    </div>
  )
}
