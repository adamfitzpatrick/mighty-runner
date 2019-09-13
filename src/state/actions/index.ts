import { Action as ReduxAction } from 'redux'
export * from './personal-data.actions'
export * from './characters.actions'
export * from './active-character.actions'

export interface Action<T, P> extends ReduxAction<T> {
  payload: P
}
