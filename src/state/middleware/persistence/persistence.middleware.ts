import { MiddlewareAPI, Dispatch, AnyAction } from 'redux'
import ApiService from '@services/api-service'
import { Action, CharactersAction, ActiveCharacterAction, ApiErrorAction } from '../../actions'
import { Character, CharacterIdentifier } from '@models'
import { assembleCharacter, flattenCharacter } from '../middleware-utility'
import { AppState } from '@state/default-state'

function loadCharacters () {
  return (dispatch: Dispatch<AnyAction>) => {
    ApiService.getCharacterList()
      .then(characters => {
        dispatch({
          type: CharactersAction.SET_CHARACTERS,
          payload: characters
        })
        dispatch({ type: ApiErrorAction.SET_API_HEALTHY })
      }, () => {
        dispatch({ type: ApiErrorAction.SET_API_ERROR })
      })
  }
}

function conditionallySetCharacter (
  character: Character,
  dispatch: Dispatch<AnyAction>,
  existingCharacter: CharacterIdentifier | null
) {
  if (!existingCharacter || character.updated > existingCharacter.updated) {
    flattenCharacter(character, dispatch)
  }
}

function loadCharacter (characterId: string, existingCharacter: CharacterIdentifier | null) {
  return (dispatch: Dispatch<AnyAction>) => {
    ApiService.getCharacter(characterId)
      .then(character => {
        conditionallySetCharacter(character, dispatch, existingCharacter)
        dispatch({ type: ApiErrorAction.SET_API_HEALTHY })
      }, () => {
        dispatch({ type: ApiErrorAction.SET_API_ERROR })
      })
  }
}

function persistActiveCharacter (character: Character) {
  return (dispatch: Dispatch<AnyAction>) => {
    ApiService.putCharacter(character.id, character)
      .then(
        () => dispatch({ type: ApiErrorAction.SET_API_HEALTHY }),
        () => dispatch({ type: ApiErrorAction.SET_API_ERROR })
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
        const existingCharacter = api.getState().activeCharacter
        loadCharacter((action as Action<ActiveCharacterAction, string>).payload, existingCharacter)(api.dispatch)
        break
      case CharactersAction.LOAD_CHARACTERS:
        loadCharacters()(api.dispatch)
        break
    }
    next(action)
  }
}
