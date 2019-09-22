import * as React from 'react'

import * as styles from './effects.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@state/default-state'
import Effect from '@components/effect'
import { updateEffectCreator, saveCharacterCreator } from '@state/actions'
import * as Models from '@models'

interface EffectsByIdProps {
  ids: string[]
  edit?: boolean
}

interface EffectsByTargetProps {
  target: string[]
}

function getStateManagers () {
  const dispatch = useDispatch()
  return {
    updateEffect: updateEffectCreator(dispatch),
    saveCharacter: saveCharacterCreator(dispatch)
  }
}

export function EffectsById (props: EffectsByIdProps) {
  const { updateEffect, saveCharacter } = getStateManagers()

  let effects = useSelector((state: AppState) => state.effects)
  if (!effects) { return null }

  const relevantEffects = effects.filter(effect => props.ids.indexOf(effect.id) !== -1)

  function renderEffect (effect: Models.Effect) {
    return <Effect key={ effect.id } effect={ effect } onToggle={ updateEffect } />
  }

  function renderEffectForEdit (effect: Models.Effect) {
    return (
      <Effect
        key={ effect.id }
        effect={ effect }
        onChange={ updateEffect }
        onBlur={ saveCharacter }
      />
    )
  }

  return <React.Fragment>
    {
      relevantEffects.map(effect => {
        return (props.edit ? renderEffectForEdit : renderEffect).call(this, effect)
      })
    }
  </React.Fragment>
}

export function EffectsByTarget ({ target }: EffectsByTargetProps) {
  const { updateEffect, saveCharacter } = getStateManagers()
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
