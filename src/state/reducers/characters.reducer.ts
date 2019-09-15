import initialState, { AppState } from '@state/initial-state'
import { Character } from '@models'
import { CharactersAction, Action } from '@state/actions'

export function characters (
  state: Character[] | null = initialState.characters,
  action: Action<CharactersAction, Character[]>
) {
  switch (action.type) {
    case CharactersAction.SET_CHARACTERS:
      return action.payload
    case CharactersAction.LOAD_CHARACTERS:
    case CharactersAction.LOAD_CHARACTERS_FAILURE:
    default:
      return state
  }
}
