import * as React from 'react'

import { Character } from '@models'

import * as styles from './summary.scss'
import ShowStat from '@components/show-stat'

interface LevelingBlockProps {
  character: Character
}

export default function LevelingBlock ({ character }: LevelingBlockProps) {
  return <div className={styles.levelingBlock}>
    <ShowStat
      value={character.personalData.karma}
      label='karma'
    />
    <ShowStat
      value={character.personalData.totalKarma}
      label='total karma'
    />
    <ShowStat
      value={character.personalData.nuyen}
      label='nuyen'
    />
    <ShowStat
      value={character.personalData.lifestyle}
      label='lifestyle'
    />
  </div>
}
