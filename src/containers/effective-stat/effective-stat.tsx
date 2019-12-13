import * as React from 'react'

import * as styles from './effective-stat.scss'
import { useSelector } from 'react-redux'
import { AppState } from '@state/default-state'
import { Effect, Stat } from '@models'
import { getEffectiveValue } from '@services/character-services'

interface Props {
  stat: Stat
}

export default function EffectiveStat ({ stat }: Props) {
  const effects = useSelector((state: AppState) => state.effects)

  if (!effects) { return null }

  const effectiveValue = getEffectiveValue(stat, effects)

  return (
    <span data-testid={`${stat.asEffectTarget.join('.')}.effective-stat.container`}
    >
      {effectiveValue}
    </span>
  )
}
