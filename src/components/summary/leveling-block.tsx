import * as React from 'react'
import classnames from 'classnames'

import { Character } from '@models'

import * as styles from './summary.scss'
import ShowStat from '@components/show-stat'

interface LevelingBlockProps {
  character: Character
  bare?: boolean
}

export default function LevelingBlock ({ character, bare }: LevelingBlockProps) {
  return <div className={classnames(
    styles.levelingBlock,
    { [styles.bare]: bare }
  )}>
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
