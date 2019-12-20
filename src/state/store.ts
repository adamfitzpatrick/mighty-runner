import { createStore, Store, combineReducers, applyMiddleware } from 'redux'
import logger from './middleware/logger'
import cleanUpEffectsMiddleware from './middleware/clean-up-effects'
import datestampMiddleware from './middleware/datestamp'
import persistenceMiddleware from './middleware/persistence/persistence.middleware'
import {
  characters,
  activeCharacter,
  pic,
  personalData,
  attributes,
  specialAttributes,
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
    specialAttributes,
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
      persistenceMiddleware,
      logger
    )
  )
}
