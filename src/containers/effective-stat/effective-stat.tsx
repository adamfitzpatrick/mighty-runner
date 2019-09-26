import * as React from 'react'

import * as styles from './effective-stat.scss'
import { useSelector } from 'react-redux'
import { AppState } from '@state/default-state'
import { Effect } from '@models'

interface Props {
  baseValue: number
  target: string[]
}

export default function EffectiveStat ({ baseValue, target }: Props) {
  const effects = useSelector((state: AppState) => state.effects)

  if (!effects) { return null }

  const modifier = effects
    .filter(effect => {
      return effect.active && effect.target.every((element, index) => element === target[index])
    })
    .reduce((sum, effect) => sum + effect.value, 0)

  return (
    <span
      data-testid={`${target.join('.')}.effective-stat.container`}
    >
      { baseValue + modifier }
    </span>
  )
}
