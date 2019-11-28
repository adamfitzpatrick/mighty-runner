import * as React from 'react'

import * as styles from './summary.scss'
import * as layout from '@assets/layout'
import { Character, Attributes } from '@models'
import HexImage from '@components/hex-image'
import Chart from '@components/chart'
import { DataPoint } from '@components/chart/chart'
import { getEffectiveValue } from '@services/character-utilities'
import AdditionalDataBlock from './additional-data-block'
import LevelingBlock from './leveling-block'
import TapSwitch from '@components/tap-switch'

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

function getPlotData (character: Character, labelLength: number) {
  return attributeKeys.map((key: keyof Attributes) => {
    const attribute = character.attributes[key]
    const value = getEffectiveValue(attribute, character.effects)
    return [ character.attributes[key].name.slice(0, labelLength), value ] as DataPoint
  })
}

function renderSmallBlock (character: Character) {
  const plotData = getPlotData(character, 1)

  return (
    <div className={styles.smallBlock}>
      <h3 className={styles.brief}>{character.personalData.metatype} {character.personalData.role}</h3>
      <h2 className={styles.name}>{character.personalData.name}</h2>
      <div className={styles.smallData}>
        <TapSwitch>
          <Chart data={plotData} bare />
          <LevelingBlock character={character} bare />
        </TapSwitch>
      </div>
    </div>
  )
}

export default function Summary ({ character }: Props) {
  const plotData = getPlotData(character, 3)

  const imageSize = window.innerWidth > layout.mediumViewportWidthMinimum ? '10rem' : '8rem'

  return <div className={styles.summary}>
    <div className={styles.contentWrapper}>
      <div className={styles.id}>
        <div className={styles.pic}>
          <HexImage pic={character.pic} width={imageSize} thumb />
        </div>
        {renderSmallBlock(character)}
      </div>
      <div className={styles.chart}><Chart data={plotData} /></div>
      <AdditionalDataBlock character={character} />
      <LevelingBlock character={character} />
    </div>
  </div>
}
