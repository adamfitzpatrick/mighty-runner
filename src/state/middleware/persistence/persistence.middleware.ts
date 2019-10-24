import { MiddlewareAPI, Dispatch, AnyAction } from 'redux'
import ApiService from '@services/api-service'
import { Action, CharactersAction, ActiveCharacterAction, ApiErrorAction } from '../../actions'
import { Character } from '@models'
import { assembleCharacter, flattenCharacter } from '../middleware-utility'

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

function loadCharacter (characterId: string) {
  return (dispatch: Dispatch<AnyAction>) => {
    ApiService.getCharacter(characterId)
      .then(character => {
        flattenCharacter(character, dispatch)
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

export default (api: MiddlewareAPI<Dispatch<AnyAction>>) => {
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
