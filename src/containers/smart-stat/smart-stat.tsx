import { h, Component } from 'preact'

import Stat from '@components/stat'
import * as styles from './smart-stat.scss'

interface Props {}

export default class SmartStat extends Component<{}> {
  render () {
    return (
      <div className={styles.smartStat}>
        <Stat label='name' value='Seidr' />
        <Stat label='essence' value={6} standard />
        <Stat label='bod' value={6} round />
      </div>
    )
  }
}
