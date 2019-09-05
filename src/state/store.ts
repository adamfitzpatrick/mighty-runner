import { createStore, Store, combineReducers } from 'redux'
import characters from './characters-reducer'
import activeCharacter from './active-character-reducer'

import initialState, { AppState } from './initial-state'

export default function configureStore (): Store<AppState> {
  const rootReducer = combineReducers({
    characters,
    activeCharacter
  })

  return createStore(rootReducer, initialState)
}
