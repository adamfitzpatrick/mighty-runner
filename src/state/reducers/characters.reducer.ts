import defaultState, { AppState } from '@state/default-state'
import { Character } from '@models'
import { CharactersAction, Action } from '@state/actions'

export function characters (
  state: Character[] | null = defaultState.characters,
  action: Action<CharactersAction, Character[]>
) {
  switch (action.type) {
    case CharactersAction.SET_CHARACTERS:
      return action.payload
    case CharactersAction.LOAD_CHARACTERS:
    default:
      return state
  }
}
