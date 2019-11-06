import { Action as ReduxAction } from 'redux'
export * from './characters'
export * from './active-character'
export * from './pic'
export * from './personal-data'
export * from './attributes'
export * from './gear'
export * from './effects'
export * from './api-error'

export interface ActionDispatcher<P> {
  (payload: P): void
}

export interface Action<T, P> extends ReduxAction<T> {
  payload: P
}
