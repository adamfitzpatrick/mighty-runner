import { Dispatch, Action } from 'redux'
import { CharacterIdentifier } from '@models'

export enum ActiveCharacterAction {
  SET_ACTIVE_CHARACTER = 'SET_ACTIVE_CHARACTER',
  SAVE_CHARACTER = 'SAVE_CHARACTER',
  LOAD_CHARACTER = 'LOAD_CHARACTER'
}

export const setActiveCharacterCreator = (dispatch: Dispatch<Action<ActiveCharacterAction>>) => {
  return (character: CharacterIdentifier) => dispatch({
    type: ActiveCharacterAction.SET_ACTIVE_CHARACTER,
    payload: character
  })
}

export const saveCharacterCreator = (dispatch: Dispatch<Action<ActiveCharacterAction>>) => {
  return () => {
    dispatch({
      type: ActiveCharacterAction.SAVE_CHARACTER
    })
  }
}

export const loadCharacterCreator = (dispatch: Dispatch<Action<ActiveCharacterAction>>) => {
  return (characterId: string) => {
    dispatch({
      type: ActiveCharacterAction.LOAD_CHARACTER,
      payload: characterId
    })
  }
}
