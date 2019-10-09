import * as React from 'react'
import { useSelector } from 'react-redux'

import { getApplicationStateManagers } from './effects'
import * as Models from '@models'
import { AppState } from '@state/default-state'
import Effect from '@components/effect'

interface EffectsByTargetProps {
  target: string[]
}

export default function EffectsByTarget ({ target }: EffectsByTargetProps) {
  const { updateEffect, saveCharacter } = getApplicationStateManagers()
  const updater = (effect: Models.Effect) => {
    updateEffect(effect)
    saveCharacter()
  }

  let effects = useSelector((state: AppState) => state.effects)
  if (!effects) { return null }

  const relevantEffects = effects.filter(effect => {
    return effect.target.every((element, index) => element === target[index])
  })

  return <React.Fragment>
    {
      relevantEffects.map(effect => {
        return (
          <Effect
            key={ effect.id }
            effect={ effect }
            onToggle={ updater }
          />
        )
      })
    }
  </React.Fragment>
}
