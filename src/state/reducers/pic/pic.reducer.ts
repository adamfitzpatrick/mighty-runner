import defaultState from '../../default-state'
import { Pic } from '@models'
import { Action, PicAction } from '../../actions'

export function pic (
  state: Pic | null = defaultState.pic,
  action: Action<PicAction, Pic>
) {
  switch (action.type) {
    case PicAction.SET_PIC:
      return action.payload
    default:
      return state
  }
}
