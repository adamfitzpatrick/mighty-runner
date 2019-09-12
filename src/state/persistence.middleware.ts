import { MiddlewareAPI, Dispatch, AnyAction } from 'redux'
import ApiService from '@services/api-service'
import { CharacterActionType, AppAction, CharacterAction } from './actions'
import { Character } from '@models'

function loadCharacter (character: Character) {
  return (dispatch: Dispatch<CharacterAction>) => {
    ApiService.getCharacter(character.id)
      .then(character => {
        dispatch({
          type: CharacterActionType.SET_ACTIVE,
          payload: character
        })
      }, err => {
        console.log(err)
      })
  }
}

function persistCharacterChange (character: Character) {
  return (dispatch: Dispatch<CharacterAction>) => {
    ApiService.putCharacter(character.id, character)
      .then(() => {
        dispatch({
          type: CharacterActionType.SAVE_CHARACTER_SUCCESS,
          payload: character
        })
      }, () => {
        dispatch({
          type: CharacterActionType.SAVE_CHARACTER_FAILURE,
          payload: character
        })
      })
  }
}

export default <AppState>(api: MiddlewareAPI<Dispatch<AnyAction>>) => (next: Dispatch<AppAction>) => (action: AppAction) => {
  switch (action.type) {
    case CharacterActionType.SAVE_CHARACTER_START:
      persistCharacterChange(action.payload)(api.dispatch)
      break
    case CharacterActionType.LOAD_CHARACTER_START:
      loadCharacter(action.payload)(api.dispatch)
      break
  }
  next(action)
}
