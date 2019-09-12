import { AnyAction, Dispatch } from 'redux'
import { Character } from '@models'

interface Action<S, T> extends AnyAction {
  type: S
  payload: T
}

export enum CharacterActionType {
  LOAD_CHARACTER_START = 'LOAD_CHARACTER_START',
  LOAD_CHARACTER_FAILURE = 'LOAD_CHARACTER_FAILURE',
  SET_ACTIVE = 'SET_ACTIVE',
  UPDATE_ACTIVE_CHARACTER = 'UPDATE_ACTIVE_CHARACTER',
  SAVE_CHARACTER_START = 'SAVE_CHARACTER_START',
  SAVE_CHARACTER_SUCCESS = 'SAVE_CHARACTER_SUCCESS',
  SAVE_CHARACTER_FAILURE = 'SAVE_CHARACTER_FAILURE'
}

export type CharacterAction = Action<CharacterActionType, Character>
export type AppAction = CharacterAction

export const setActiveCharacterCreator = (dispatch: Dispatch<AnyAction>) => {
  return (character: Character) => {
    dispatch({
      type: CharacterActionType.SET_ACTIVE,
      payload: character
    })
  }
}

export const saveCharacterCreator = (dispatch: Dispatch<AnyAction>) => {
  return (character: Character) => {
    dispatch({
      type: CharacterActionType.SAVE_CHARACTER_START,
      payload: character
    })
  }
}

export const loadCharacterCreator = (dispatch: Dispatch<AnyAction>) => {
  return (character: Character) => {
    dispatch({
      type: CharacterActionType.LOAD_CHARACTER_START,
      payload: character
    })
  }
}
