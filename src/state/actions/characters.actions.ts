import { Dispatch, Action } from 'redux'
import { Character } from '@models'

export enum CharactersAction {
  LOAD_CHARACTERS = 'LOAD_CHARACTERS',
  LOAD_CHARACTERS_SUCCESS = 'LOAD_CHARACTERS_SUCCESS',
  LOAD_CHARACTERS_FAILURE = 'LOAD_CHARACTERS_FAILURE'
}

export const loadCharactersCreator = (dispatch: Dispatch<Action<CharactersAction>>) => {
  return () => dispatch({
    type: CharactersAction.LOAD_CHARACTERS
  })
}
