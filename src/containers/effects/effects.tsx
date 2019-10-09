import * as React from 'react'
import { v4 } from 'uuid'

import * as styles from './effects.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@state/default-state'
import Effect from '@components/effect'
import { updateEffectCreator, saveCharacterCreator, removeEffectCreator, addEffectCreator } from '@state/actions'

export function getApplicationStateManagers () {
  const dispatch = useDispatch()
  return {
    updateEffect: updateEffectCreator(dispatch),
    addEffect: addEffectCreator(dispatch),
    removeEffect: removeEffectCreator(dispatch),
    saveCharacter: saveCharacterCreator(dispatch)
  }
}

export { default as EffectsById } from './effects-by-id'
export { default as EffectsByTarget } from './effects-by-target'
