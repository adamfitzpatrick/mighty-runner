import initialState, { AppState } from './initial-state'
import { Character } from '@models'

export default function characters (state: Character[] = initialState.characters) {
  return state
}
