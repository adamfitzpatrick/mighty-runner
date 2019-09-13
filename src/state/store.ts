import { createStore, Store, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import characters from './reducers/characters.reducer'
import activeCharacter from './reducers/active-character.reducer'
import personalData from './reducers/personal-data.reducer'
import persistenceMiddleware from './middleware/persistence.middleware'

import initialState, { AppState } from './initial-state'

export default function configureStore (): Store<AppState> {
  const rootReducer = combineReducers({
    characters,
    activeCharacter,
    personalData
  })

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(persistenceMiddleware, logger)
  )
}
