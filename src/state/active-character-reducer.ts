import initialState from './initial-state'
import { Character } from '@models'
import { CharacterAction, CharacterActionType } from './actions';

export default function activeCharacter (
  state: Character | null = initialState.activeCharacter,
  action: CharacterAction
) {
  switch (action.type) {
    case CharacterActionType.SET_ACTIVE:
    case CharacterActionType.SAVE_CHARACTER_START:
    case CharacterActionType.SAVE_CHARACTER_SUCCESS:
    case CharacterActionType.SAVE_CHARACTER_FAILURE:
      return action.payload
    default:
      return state
  }
  return state
}
