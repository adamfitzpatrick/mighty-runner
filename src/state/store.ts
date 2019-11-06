import { createStore, Store, combineReducers, applyMiddleware } from 'redux'
import logger from './middleware/logger'
import cleanUpEffectsMiddleware from './middleware/clean-up-effects'
import datestampMiddleware from './middleware/datestamp'
import localPersistenceMiddleware from './middleware/local-persistence'
import persistenceMiddleware from './middleware/persistence/persistence.middleware'
import {
  characters,
  activeCharacter,
  pic,
  personalData,
  attributes,
  gear,
  effects,
  apiError
} from './reducers'
import defaultState, { AppState } from './default-state'

export default function configureStore (initialState?: AppState): Store<AppState> {
  initialState = initialState || defaultState
  const rootReducer = combineReducers({
    characters,
    pic,
    activeCharacter,
    personalData,
    attributes,
    gear,
    effects,
    apiError
  })

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      cleanUpEffectsMiddleware,
      datestampMiddleware,
      localPersistenceMiddleware,
      persistenceMiddleware,
      logger
    )
  )
}
