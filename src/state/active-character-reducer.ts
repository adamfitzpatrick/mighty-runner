import initialState from './initial-state'
import { Character } from '@models'

export default function activeCharacter (state: Character = initialState.activeCharacter) {
  return state
}
