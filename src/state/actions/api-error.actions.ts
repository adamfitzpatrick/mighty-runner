import { Dispatch, Action } from 'redux'

export enum ApiErrorAction {
  SET_API_ERROR = 'SET_API_ERROR',
  SET_API_HEALTHY = 'SET_API_HEALTHY'
}

export const setApiErrorCreator = (dispatch: Dispatch<Action<ApiErrorAction>>) => {
  return dispatch({ type: ApiErrorAction.SET_API_ERROR })
}

export const setApiHealthy = (dispatch: Dispatch<Action<ApiErrorAction>>) => {
  return dispatch({ type: ApiErrorAction.SET_API_HEALTHY })
}
