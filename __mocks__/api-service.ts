import ApiService from '../src/services/api-service'
import { Character, PersonalData, Attributes, SpecialAttributes, GearItem, Effect } from '../models'

const character = {
  id: '1',
  userId: 'u',
  created: 1,
  updated: 1,
  favorite: false,
  personalData: {} as PersonalData,
  attributes: {} as Attributes,
  specialAttributes: {} as SpecialAttributes,
  gear: [] as GearItem[],
  effects: [] as Effect[]
} as Character

function getCharacterList (): Promise<Character[]> {
  return new Promise<Character[]>(resolve => {
    process.nextTick(() => resolve([]))
  })
}

function getCharacter (id: string): Promise<Character> {
  return new Promise(resolve => {
    process.nextTick(() => resolve(character))
  })
}

function putCharacter (id: string, character: Character): Promise<{ message: string }> {
  return new Promise(resolve => {
    process.nextTick(() => resolve({ message: 'accepted' }))
  })
}

const MockApiService: typeof ApiService = {
  TOKEN_LOCAL_STORAGE_KEY: 'TOKEN_LOCAL_STORAGE_KEY',
  URL: 'url',
  getCharacterList,
  getCharacter,
  putCharacter
}

export default MockApiService
