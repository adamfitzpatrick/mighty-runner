import * as React from 'react'
import {
  createStore,
  combineReducers,
  AnyAction,
  Store,
  Dispatch,
  applyMiddleware
} from 'redux'
import { Provider } from 'react-redux'
import { render, RenderResult } from '@testing-library/react'
import { AppState, defaultState } from '../src/state/default-state'
import {
  characters,
  activeCharacter,
  personalData,
  attributes,
  gear,
  effects
} from '../src/state/reducers'

export type RenderWithRedux =
  RenderResult &
  {
    store: Store<AppState, AnyAction>,
    dispatchSpy: jest.Mock<Dispatch<AnyAction>>
  }

const reducer = combineReducers({
  characters,
  activeCharacter,
  personalData,
  attributes,
  gear,
  effects
})

const getSpyMiddleware = (dispatchSpy: jest.Mock<Dispatch<AnyAction>>) => () => {
  return (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    dispatchSpy(action)
    next(action)
  }
}

export function renderWithRedux (
  ui: JSX.Element,
  initialState: AppState,
): RenderWithRedux {
  const dispatchSpy: jest.Mock<Dispatch<AnyAction>> = jest.fn()
  const spyMiddleware = getSpyMiddleware(dispatchSpy)
  const store = createStore(reducer, initialState, applyMiddleware(spyMiddleware))

  return {
    ...render(<Provider store={store}>{ ui }</Provider>),
    store,
    dispatchSpy
  }
}
