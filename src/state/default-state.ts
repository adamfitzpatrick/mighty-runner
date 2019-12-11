import { Character, PersonalData, CharacterIdentifier, Attributes, Effect, GearItem, Pic, SpecialAttributes } from '@models'

export interface AppState {
  characters: Character[] | null
  activeCharacter: CharacterIdentifier | null
  pic: Pic | null
  personalData: PersonalData | null
  attributes: Attributes | null
  specialAttributes: SpecialAttributes | null
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
  specialAttributes: null,
  gear: null,
  effects: null,
  apiError: false
}

export default defaultState
