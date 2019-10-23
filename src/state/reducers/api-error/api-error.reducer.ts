import { Action } from 'redux'
import { ApiErrorAction } from '@state/actions'

export function apiError (
  state: boolean = false,
  action: Action<ApiErrorAction>
) {
  if (action.type === ApiErrorAction.SET_API_ERROR) {
    return true
  } else if (action.type === ApiErrorAction.RESOLVE_API_ERROR) {
    return false
  }
  return state
}
