import { Dispatch } from 'react'

import { Effect } from '@models'
import { Action } from '@state/actions'

export enum EffectsAction {
  SET_EFFECTS = 'SET_EFFECTS',
  UPDATE_EFFECT = 'UPDATE_EFFECT',
  ADD_EFFECT = 'ADD_EFFECT',
  REMOVE_EFFECT = 'REMOVE_EFFECT'
}

export const setEffectsCreator = (dispatch: Dispatch<Action<EffectsAction, Effect[]>>) => {
  return (effects: Effect[]) => dispatch({
    type: EffectsAction.SET_EFFECTS,
    payload: effects
  })
}

export const updateEffectCreator = (dispatch: Dispatch<Action<EffectsAction, Effect>>) => {
  return (effect: Effect) => dispatch({
    type: EffectsAction.UPDATE_EFFECT,
    payload: effect
  })
}

export const addEffectCreator = (dispatch: Dispatch<Action<EffectsAction, Effect>>) => {
  return (effect: Effect) => dispatch({
    type: EffectsAction.ADD_EFFECT,
    payload: effect
  })
}

export const removeEffectCreator = (dispatch: Dispatch<Action<EffectsAction, Effect>>) => {
  return (effect: Effect) => dispatch({
    type: EffectsAction.REMOVE_EFFECT,
    payload: effect
  })
}
