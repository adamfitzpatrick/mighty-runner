import { defaultState } from '@state/default-state'
import { Action } from '@state/actions'
import { EffectsAction } from '@state/actions/effects.actions'
import { Effect } from '@models'

const getEffectsWithReplacement = (effects: Effect[], replacement: Effect): Effect[] => {
  const updatedArray = [ ...effects ]
  updatedArray[updatedArray.findIndex(effect => effect.id === replacement.id)] = replacement
  return updatedArray
}

const getEffectsWithRemoval = (effects: Effect[], removal: Effect): Effect[] => {
  const updatedArray = [ ...effects ]
  const index = updatedArray.findIndex(effect => effect.id === removal.id)
  if (index >= 0) {
    updatedArray.splice(index, 1)
  }
  return updatedArray
}

export function effects (
  state: Effect[] | null = defaultState.effects,
  action: Action<EffectsAction, Effect[] | Effect>
) {
  switch (action.type) {
    case EffectsAction.SET_EFFECTS:
      return action.payload as Effect[]
    case EffectsAction.UPDATE_EFFECT:
      return getEffectsWithReplacement(state!, action.payload as Effect)
    case EffectsAction.ADD_EFFECT:
      return [ ...state!, action.payload as Effect ]
    case EffectsAction.REMOVE_EFFECT:
      return getEffectsWithRemoval(state!, action.payload as Effect)
  }
  return state
}
