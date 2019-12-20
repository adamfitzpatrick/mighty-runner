import { MiddlewareAPI, Dispatch, AnyAction } from 'redux'
import * as PersistenceMediator from '@services/persistence-mediator-service'
import { Action, CharactersAction, ActiveCharacterAction, ApiErrorAction } from '../../actions'
import { Character, CharacterIdentifier } from '@models'
import { assembleCharacter, flattenCharacter } from '../middleware-utility'
import { AppState } from '@state/default-state'

function loadCharacters () {
  return (dispatch: Dispatch<AnyAction>) => {
    PersistenceMediator.getCharacterList()
      .then(characters => {
        dispatch({
          type: CharactersAction.SET_CHARACTERS,
          payload: characters
        })
        dispatch({ type: ApiErrorAction.SET_API_HEALTHY })
      }, (err: PersistenceMediator.PersistenceError) => {
        dispatch({
          type: CharactersAction.SET_CHARACTERS,
          payload: err.fallback as Character[]
        })
        dispatch({ type: ApiErrorAction.SET_API_ERROR })
      })
  }
}

function loadCharacter (characterId: string) {
  return (dispatch: Dispatch<AnyAction>) => {
    PersistenceMediator.getCharacter(characterId)
      .then((character: Character) => {
        flattenCharacter(character, dispatch)
        dispatch({ type: ApiErrorAction.SET_API_HEALTHY })
      }, (err: PersistenceMediator.PersistenceError) => {
        flattenCharacter(err.fallback as Character, dispatch)
        dispatch({ type: ApiErrorAction.SET_API_ERROR })
      })
  }
}

function persistActiveCharacter (character: Character) {
  return (dispatch: Dispatch<AnyAction>) => {
    PersistenceMediator.putCharacter(character)
      .then(
        () => {
          dispatch({ type: ApiErrorAction.SET_API_HEALTHY })
          dispatch({ type: CharactersAction.LOAD_CHARACTERS })
        },
        () => {
          dispatch({ type: ApiErrorAction.SET_API_ERROR })
          dispatch({ type: CharactersAction.LOAD_CHARACTERS })
        }
      )
  }
}

export default (api: MiddlewareAPI<Dispatch<AnyAction>, AppState>) => {
  return (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    switch (action.type) {
      case ActiveCharacterAction.SAVE_CHARACTER:
        const character = assembleCharacter(api.getState())
        persistActiveCharacter(character)(api.dispatch)
        break
      case ActiveCharacterAction.LOAD_CHARACTER:
        loadCharacter((action as Action<ActiveCharacterAction, string>).payload)(api.dispatch)
        break
      case CharactersAction.LOAD_CHARACTERS:
        loadCharacters()(api.dispatch)
        break
    }
    next(action)
  }
}
