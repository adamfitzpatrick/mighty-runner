import { h } from 'preact'

import Chart from '@components/chart'
import HexImage from '@components/hex-image'

import * as styles from './character-card.scss'

export default function CharacterCard () {
  return (
    <div className={styles.characterCard}>
      <div className={styles.data}>
        <div className={styles.descriptor}>Dwarf Infiltrator</div>
        <div className={styles.name}>Melodium Flynn</div>
        <div className={styles.chart}>
          <Chart />
        </div>
      </div>
      <div className={styles.image}>
        <HexImage />
      </div>
    </div>
  )
}
