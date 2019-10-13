import { createStore, Store, combineReducers, applyMiddleware } from 'redux'
import logger from './middleware/logger'
import localPersistenceMiddleware from './middleware/local-persistence'
import persistenceMiddleware from './middleware/persistence.middleware'
import cleanUpEffectsMiddleware from './middleware/clean-up-effects'
import {
  characters,
  activeCharacter,
  personalData,
  attributes,
  gear,
  effects
} from './reducers'
import defaultState, { AppState } from './default-state'

export default function configureStore (initialState?: AppState): Store<AppState> {
  initialState = initialState || defaultState
  const rootReducer = combineReducers({
    characters,
    activeCharacter,
    personalData,
    attributes,
    gear,
    effects
  })

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      cleanUpEffectsMiddleware,
      localPersistenceMiddleware,
      persistenceMiddleware,
      logger
    )
  )
}
