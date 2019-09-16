import { Character, PersonalData, CharacterIdentifier, Attributes, Effect, GearItem } from '@models'

export interface AppState {
  characters: Character[] | null
  activeCharacter: CharacterIdentifier | null
  personalData: PersonalData | null
  attributes: Attributes | null
  gear: GearItem[] | null
  effects: Effect[] | null
}


export const initialState: AppState = {
  characters: null,
  activeCharacter: null,
  personalData: null,
  attributes: null,
  gear: null,
  effects: null
}

export default initialState
