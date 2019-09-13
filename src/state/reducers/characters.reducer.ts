import initialState, { AppState } from '../initial-state'
import { Character } from '@models'
import { CharactersAction, Action } from '../actions'

export default function characters (
  state: Character[] | null = initialState.characters,
  action: Action<CharactersAction, Character[]>
) {
  switch (action.type) {
    case CharactersAction.LOAD_CHARACTERS_SUCCESS:
      return action.payload
    case CharactersAction.LOAD_CHARACTERS:
    case CharactersAction.LOAD_CHARACTERS_FAILURE:
    default:
      return state
  }
}
