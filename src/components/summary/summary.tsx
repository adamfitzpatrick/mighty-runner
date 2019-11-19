import * as React from 'react'

import * as styles from './summary.scss'
import { Character, Attributes } from '@models'
import HexImage from '@components/hex-image'
import Chart from '@components/chart'
import { DataPoint } from '@components/chart/chart'
import { getEffectiveValue } from '@services/character-utilities'
import AdditionalDataBlock from './additional-data-block'
import LevelingBlock from './leveling-block'

interface Props {
  character: Character
}

const attributeKeys: (keyof Attributes)[] = [
  'body',
  'agility',
  'reaction',
  'strength',
  'willpower',
  'intuition',
  'logic',
  'charisma'
]

export default function Summary ({ character }: Props) {
  const plotData = attributeKeys.map((key: keyof Attributes) => {
    const attribute = character.attributes[key]
    const value = getEffectiveValue(attribute, character.effects)
    return [ character.attributes[key].name.slice(0, 3), value ] as DataPoint
  })

  return <div className={styles.summary}>
    <div className={styles.pic}>
      <HexImage pic={character.pic} width='12rem' thumb />
    </div>
    <div>
      <h3 className={styles.brief}>{character.personalData.metatype} {character.personalData.role}</h3>
      <h2 className={styles.name}>{character.personalData.name}</h2>
    </div>
    <div className={styles.chart}><Chart data={plotData} /></div>
    <AdditionalDataBlock character={character} />
    <LevelingBlock character={character} />
  </div>
}
