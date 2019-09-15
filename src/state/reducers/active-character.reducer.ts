import initialState from '@state/initial-state'
import { Action, ActiveCharacterAction } from '../actions'
import { CharacterIdentifier } from '@models'

export function activeCharacter (
  state: CharacterIdentifier | null = initialState.activeCharacter,
  action: Action<ActiveCharacterAction, CharacterIdentifier>
) {
  switch (action.type) {
    case ActiveCharacterAction.SET_ACTIVE_CHARACTER:
    case ActiveCharacterAction.SAVE_CHARACTER_FAILURE:
      return action.payload
    case ActiveCharacterAction.SAVE_CHARACTER:
    default:
      return state
  }
}
