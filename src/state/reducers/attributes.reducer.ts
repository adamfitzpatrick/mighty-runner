import { Action, AttributesAction, UpdateAttributePayload } from '@state/actions'
import { Attributes } from '@models'
import defaultState from '@state/default-state'

export function attributes (
  state: Attributes | null = defaultState.attributes,
  action: Action<AttributesAction, Attributes | UpdateAttributePayload>
) {
  switch (action.type) {
    case AttributesAction.SET_ATTRIBUTES:
      return action.payload as Attributes
    case AttributesAction.UPDATE_ATTRIBUTE:
      const payload = action.payload as UpdateAttributePayload
      console.log(payload.name)
      return { ...state, [payload.name]: payload.attribute } as Attributes
    default:
      return state
  }
}
