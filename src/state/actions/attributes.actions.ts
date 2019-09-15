import { Dispatch } from 'redux'
import { Action } from '.'
import { Attributes, Attribute } from '@models'

export interface UpdateAttributePayload {
  name: string
  attribute: Attribute
}

export enum AttributesAction {
  SET_ATTRIBUTES = 'SET_ATTRIBUTES',
  UPDATE_ATTRIBUTE = 'UPDATE_ATTRIBUTE'
}

export const setAttributesCreator = (dispatch: Dispatch<Action<AttributesAction, Attributes>>) => {
  return (attributes: Attributes) => dispatch({
    type: AttributesAction.SET_ATTRIBUTES,
    payload: attributes
  })
}

export const updateAttributeCreator = (dispatch: Dispatch<Action<AttributesAction, UpdateAttributePayload>>) => {
  return (name: string, attribute: Attribute) => dispatch({
    type: AttributesAction.UPDATE_ATTRIBUTE,
    payload: { name, attribute }
  })
}
