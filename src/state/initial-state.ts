import { Character, PersonalData, CharacterIdentifier } from '@models'

export interface AppState {
  characters: Character[] | null
  activeCharacter: CharacterIdentifier | null
  personalData: PersonalData | null
}

const initialState: AppState = {
  characters: null,
  activeCharacter: null,
  personalData: null
}

export default initialState
