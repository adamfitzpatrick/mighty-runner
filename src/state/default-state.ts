import { Character, PersonalData, CharacterIdentifier, Attributes, Effect, GearItem, Pic } from '@models'

export interface AppState {
  characters: Character[] | null
  activeCharacter: CharacterIdentifier | null
  pic: Pic | null
  personalData: PersonalData | null
  attributes: Attributes | null
  gear: GearItem[] | null
  effects: Effect[] | null
  apiError: boolean
}

export const defaultState: AppState = {
  characters: null,
  pic: null,
  activeCharacter: null,
  personalData: null,
  attributes: null,
  gear: null,
  effects: null,
  apiError: false
}

export default defaultState
