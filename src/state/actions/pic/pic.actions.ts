import { Dispatch, Action } from 'redux'
import { Pic } from '@models'

export enum PicAction {
  SET_PIC = 'SET_PIC'
}

export const setPicCreator = (dispatch: Dispatch<Action<PicAction>>) => {
  return (pic: Pic) => dispatch({
    type: PicAction.SET_PIC,
    payload: pic
  })
}
