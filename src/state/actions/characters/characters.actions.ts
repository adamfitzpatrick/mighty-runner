import { Dispatch, Action } from 'redux'
import { Character } from '@models'

export enum CharactersAction {
  LOAD_CHARACTERS = 'LOAD_CHARACTERS',
  SET_CHARACTERS = 'SET_CHARACTERS'
}

export const loadCharactersCreator = (dispatch: Dispatch<Action<CharactersAction>>) => {
  return () => dispatch({
    type: CharactersAction.LOAD_CHARACTERS
  })
}

export const setCharactersCreator = (dispatch: Dispatch<Action<CharactersAction>>) => {
  return (characters: Character[]) => dispatch({
    type: CharactersAction.SET_CHARACTERS,
    payload: characters
  })
}
