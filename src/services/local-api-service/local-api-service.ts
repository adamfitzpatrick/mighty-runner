import { Character } from '@models'

const CHARACTERS_LOCAL_STORAGE_KEY = 'mighty_runner_characters'

export interface CharactersMap {
  [id: string]: Character
}

export const getCharacterList = (): CharactersMap => {
  const value = localStorage.getItem(CHARACTERS_LOCAL_STORAGE_KEY) || '{}'
  try {
    return JSON.parse(value)
  } catch (e) {
    return {}
  }
}

export const getCharacter = (id: string): Character | null => {
  return getCharacterList()[id] || null
}

export const putCharacter = (characterId: string, character: Character) => {
  const charactersObject = getCharacterList()
  charactersObject[characterId] = character
  localStorage.setItem(CHARACTERS_LOCAL_STORAGE_KEY, JSON.stringify(charactersObject))
}
