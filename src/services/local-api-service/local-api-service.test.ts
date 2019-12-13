import * as LocalApiService from '.'
import { Character } from '@models'

describe('LocalApiService', () => {
  let characters = {
    '1': { id: '1' },
    '2': { id: '2' }
  }
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('mighty_runner_characters', JSON.stringify(characters))
  })

  describe('getCharacterList', () => {
    test('should return a map of characters from localStorage', () => {
      expect(LocalApiService.getCharacterList()).toEqual(characters)
    })

    test('should return an empty object if there are no characters stored in localStorage', () => {
      localStorage.clear()
      expect(LocalApiService.getCharacterList()).toEqual({})
    })

    test('should return an empty object if the contents of localStorage cannot be parsed', () => {
      localStorage.setItem('mighty_runner_characters', 'nope')
      expect(LocalApiService.getCharacterList()).toEqual({})
    })
  })

  describe('getCharacter', () => {
    test('should return the requested character', () => {
      expect(LocalApiService.getCharacter('1')).toEqual(characters['1'])
      expect(LocalApiService.getCharacter('2')).toEqual(characters['2'])
    })

    test('should return null if the localStorage key does not exist', () => {
      localStorage.clear()
      expect(LocalApiService.getCharacter('1')).toBeNull()
    })
  })

  describe('putCharacter', () => {
    test('should store the character in localStorage', () => {
      LocalApiService.putCharacter('3', { id: '3' } as Character)
      const addedCharacter = JSON.parse(localStorage.getItem('mighty_runner_characters')!)['3']
      expect(addedCharacter).toEqual({ id: '3' })
    })
  })
})
