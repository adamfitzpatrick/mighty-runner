import { Dispatch } from 'redux'
import { Action } from '@state/actions'
import { GearItem } from '@models'

export enum GearAction {
  SET_GEAR = 'SET_GEAR',
  UPDATE_GEAR = 'UPDATE_GEAR',
  ADD_GEAR = 'ADD_GEAR',
  REMOVE_GEAR = 'REMOVE_GEAR'
}

export const setGearCreator = (dispatch: Dispatch<Action<GearAction, GearItem[]>>) => {
  return (gear: GearItem[]) => dispatch({
    type: GearAction.SET_GEAR,
    payload: gear
  })
}

export const updateGearCreator = (dispatch: Dispatch<Action<GearAction, GearItem>>) => {
  return (gear: GearItem) => dispatch({
    type: GearAction.UPDATE_GEAR,
    payload: gear
  })
}
