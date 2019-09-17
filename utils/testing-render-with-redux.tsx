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
import * as Models from '@models'
import { AppState } from '../src/state/default-state'

export type RenderWithRedux =
  RenderResult &
  {
    store: Store<AppState, AnyAction>,
    dispatchSpy: jest.Mock<Dispatch<AnyAction>>
  }

const reducer = combineReducers({
  characters: (state: Models.Character[] | null = null) => state,
  activeCharacter: (state: Models.CharacterIdentifier | null = null) => state,
  personalData: (state: Models.PersonalData | null = null) => state,
  attributes: (state: Models.Attributes | null = null) => state,
  gear: (state: Models.GearItem[] | null = null) => state,
  effects: (state: Models.Effect[] | null = null) => state
})

const getSpyMiddleware = (dispatchSpy: jest.Mock<Dispatch<AnyAction>>) => () => {
  return (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    dispatchSpy(action)
    next(action)
  }
}

export function renderWithRedux (
  ui: JSX.Element,
  initialState: AppState
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
