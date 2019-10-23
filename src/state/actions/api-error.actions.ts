import { Dispatch, Action } from 'redux'

export enum ApiErrorAction {
  SET_API_ERROR = 'SET_API_ERROR',
  RESOLVE_API_ERROR = 'RESOLVE_API_ERROR'
}

export const setApiErrorCreator = (dispatch: Dispatch<Action<ApiErrorAction>>) => {
  return dispatch({ type: ApiErrorAction.SET_API_ERROR })
}

export const resolveApiErrorCreator = (dispatch: Dispatch<Action<ApiErrorAction>>) => {
  return dispatch({ type: ApiErrorAction.RESOLVE_API_ERROR })
}
