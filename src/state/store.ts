import { createStore, Store, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import characters from './characters-reducer'
import activeCharacter from './active-character-reducer'
import persistenceMiddleware from './persistence.middleware'

import initialState, { AppState } from './initial-state'

export default function configureStore (): Store<AppState> {
  const rootReducer = combineReducers({
    characters,
    activeCharacter
  })

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(persistenceMiddleware, logger)
  )
}
