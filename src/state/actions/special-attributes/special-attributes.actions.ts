import { Dispatch, Action } from 'redux'
import { SpecialAttributes } from '@models'

export enum SpecialAttributesAction {
  SET_SPECIAL_ATTRIBUTES = 'SET_SPECIAL_ATTRIBUTES'
}

export const setSpecialAttributesCreator = (dispatch: Dispatch<Action<SpecialAttributesAction>>) => {
  return (specialAttributes: SpecialAttributes) => dispatch({
    type: SpecialAttributesAction.SET_SPECIAL_ATTRIBUTES,
    payload: specialAttributes
  })
}
