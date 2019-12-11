import defaultState from '../../default-state'
import { SpecialAttributes } from '@models'
import { Action, SpecialAttributesAction } from '../../actions'

export function specialAttributes (
  state: SpecialAttributes | null = defaultState.specialAttributes,
  action: Action<SpecialAttributesAction, SpecialAttributes>
) {
  switch (action.type) {
    case SpecialAttributesAction.SET_SPECIAL_ATTRIBUTES:
      return action.payload
    default:
      return state
  }
}
