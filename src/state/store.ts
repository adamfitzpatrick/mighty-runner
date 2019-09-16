import { createStore, Store, combineReducers, applyMiddleware } from 'redux'
import logger from './middleware/logger'
import persistenceMiddleware from './middleware/persistence.middleware'
import {
  characters,
  activeCharacter,
  personalData,
  attributes,
  gear,
  effects
} from './reducers'
import initialState, { AppState } from './initial-state'

export default function configureStore (): Store<AppState> {
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
    applyMiddleware(persistenceMiddleware, logger)
  )
}
