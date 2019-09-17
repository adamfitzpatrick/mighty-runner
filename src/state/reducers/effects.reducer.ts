import { defaultState } from '@state/default-state'
import { Action } from '@state/actions'
import { EffectsAction } from '@state/actions/effects.actions'
import { Effect } from '@models'

const getEffectsWithReplacement = (effects: Effect[], replacement: Effect): Effect[] => {
  const updatedArray = [ ...effects ]
  updatedArray[updatedArray.findIndex(effect => effect.id === replacement.id)] = replacement
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
      if (state) {
        return getEffectsWithReplacement(state, action.payload as Effect)
      }
      return state
    default:
      return state
  }
}
