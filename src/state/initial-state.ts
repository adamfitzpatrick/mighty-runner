import { Character, PersonalData, CharacterIdentifier, Attributes, Effectable, Effect } from '@models'

export interface AppState {
  characters: Character[] | null
  activeCharacter: CharacterIdentifier | null
  personalData: PersonalData | null
  attributes: Attributes | null
  effects: Effect[] | null
}


export const initialState: AppState = {
  characters: null,
  activeCharacter: null,
  personalData: null,
  attributes: null,
  effects: null
}

export default initialState
