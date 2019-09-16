import * as React from 'react'

import * as styles from './effects.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@state/initial-state'
import Effect from '@components/effect'
import { updateEffectCreator, saveCharacterCreator } from '@state/actions'
import * as Models from '@models'
import { AnyAction } from 'redux'


interface EffectsBaseProps {
  effects: Models.Effect[]
}

function EffectsBase ({ effects }: EffectsBaseProps) {
  const dispatch = useDispatch()
  const updateEffect = updateEffectCreator(dispatch)
  const saveCharacter = saveCharacterCreator(dispatch)

  const onToggle = (effect: Models.Effect) => {
    updateEffect(effect)
    saveCharacter()
  }

  return (
    <div>
      { effects.map(effect => <Effect key={effect.id} effect={effect} onToggle={onToggle} />) }
    </div>
  )
}

interface EffectsProps {
  effectIds: string[]
}

export default function Effects (props?: EffectsProps) {
  let effects = useSelector((state: AppState) => state.effects)

  if (!effects) { return null }

  if (props) {
    effects = effects.filter(effect => props.effectIds.indexOf(effect.id) !== -1)
  }

  return <EffectsBase effects={effects} />
}

interface EffectsByTargetProps {
  target: string[]
}

export function EffectsByTarget ({ target }: EffectsByTargetProps) {
  let effects = useSelector((state: AppState) => state.effects)

  if (!effects) { return null }

  effects = effects.filter(effect => {
    return effect.target.every((element, index) => element === target[index])
  })

  return <EffectsBase effects={effects} />
}
