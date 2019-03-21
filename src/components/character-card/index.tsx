import { h } from 'preact'

import { CharacterModel } from '@assets/models'

import Chart from '@components/chart'
import HexImage from '@components/hex-image'

import * as styles from './character-card.scss'

interface CharacterCardProps {
  character: CharacterModel
}

export default function CharacterCard ({ character }: CharacterCardProps) {
  return (
    <div className={styles.characterCard}>
      <div className={styles.data}>
        <div className={styles.descriptor}>{ character.metatype } { character.brief}</div>
        <div className={styles.name}>{ character.name }</div>
        <div className={styles.chart}>
          <Chart attributes={character.attributes}/>
        </div>
      </div>
      <div className={styles.image}>
        <HexImage image={character.imageUrl}/>
      </div>
    </div>
  )
}
