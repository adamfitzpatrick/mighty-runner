const remoteApiMockProvider = {
  TOKEN_LOCAL_STORAGE_KEY: 'token-key',
  URL: 'url',
  getCharacterList: jest.fn(),
  getCharacter: jest.fn(),
  putCharacter: jest.fn()
}
jest.mock('@services/remote-api-service', () => remoteApiMockProvider)
import * as RemoteApiService from '@services/remote-api-service'
import * as PersistenceMediatorService from '.'
import { Character } from '@models'
import { CharactersMap } from '@services/local-api-service'
import { PersistenceError } from './persistence-mediator-service'

describe('persistence mediator service', () => {
  let localCharacters: CharactersMap
  let localCharacterArray: Character[]
  let remoteCharacters: Character[]
  let remoteApiMock: typeof remoteApiMockProvider

  beforeEach(() => {
    localCharacters = {
      '1': {
        id: '1',
        updated: 1,
        favorite: true
      } as Character,
      '2': {
        id: '2',
        updated: 1,
        favorite: false
      } as Character
    } as CharactersMap
    localCharacterArray = Object.keys(localCharacters).map(key => localCharacters[key])
    remoteCharacters = [{
      id: '1',
      updated: 0,
      favorite: false
    }, {
      id: '2',
      updated: 2,
      favorite: true
    }] as Character[]
    remoteApiMock = RemoteApiService as typeof remoteApiMockProvider
    localStorage.setItem('mighty_runner_characters', JSON.stringify(localCharacters))
  })

  describe('getCharacterList', () => {
    test('should return a list containing the most recent version of each character', async () => {
      remoteApiMock.getCharacterList.mockResolvedValue(remoteCharacters)
      const expected = [localCharacters['1'], remoteCharacters[1]]
      return PersistenceMediatorService.getCharacterList()
        .then(data => expect(data).toEqual(expected))
    })

    test('should return the local data as an error if the remote api returns an error', async () => {
      remoteApiMock.getCharacterList.mockRejectedValue({ status: 500 })
      return PersistenceMediatorService.getCharacterList()
        .then(() => expect('Promise should not have been resolved').toBe(''))
        .catch((data: PersistenceError) => {
          expect(data.status).toBe(500)
          expect(data.fallback).toEqual(localCharacterArray)
        })
    })

    test('should include any characters in local storage that are missing from the remote', async () => {
      localCharacters['3'] = {
        id: '3',
        updated: 1,
        favorite: false
      } as Character
      localStorage.setItem('mighty_runner_characters', JSON.stringify(localCharacters))
      remoteApiMock.getCharacterList.mockResolvedValue(remoteCharacters)
      const expected = [localCharacters['1'], remoteCharacters[1], localCharacters['3']]
      return PersistenceMediatorService.getCharacterList()
        .then(data => expect(data).toEqual(expected))
    })

    test('should include any characters in remote storage that are missing from local', async () => {
      remoteCharacters.push({
        id: '3',
        updated: 1,
        favorite: false
      } as Character)
      remoteApiMock.getCharacterList.mockResolvedValue(remoteCharacters)
      const expected = [localCharacters['1'], remoteCharacters[1], remoteCharacters[2]]
      return PersistenceMediatorService.getCharacterList()
        .then(data => expect(data).toEqual(expected))
    })
  })

  describe('getCharacter', () => {
    test('should return the remote response if it is more recent', async () => {
      remoteApiMock.getCharacter.mockResolvedValue(remoteCharacters[1])
      return PersistenceMediatorService.getCharacter('2')
        .then(data => expect(data).toEqual(remoteCharacters[1]))
    })

    test('should return the local response if it is more recent', async () => {
      remoteApiMock.getCharacter.mockResolvedValue(remoteCharacters[0])
      return PersistenceMediatorService.getCharacter('1')
        .then(data => expect(data).toEqual(localCharacters['1']))
    })

    test('should return the remote response if the timestamps are identical', async () => {
      remoteCharacters[0].updated = 1
      remoteApiMock.getCharacter.mockResolvedValue(remoteCharacters[0])
      return PersistenceMediatorService.getCharacter('2')
        .then(data => expect(data).toEqual(remoteCharacters[0]))
    })

    test('should return the local response and error information if the remote api returns an error', async () => {
      remoteApiMock.getCharacter.mockRejectedValue({ status: 500 })
      return PersistenceMediatorService.getCharacter('2')
        .then(() => expect('Promise should not have been resolved').toBe(''))
        .catch((data: PersistenceError) => {
          expect(data.status).toBe(500)
          expect(data.fallback).toEqual(localCharacters['2'])
        })
    })
  })

  describe('putCharacter', () => {
    let updatedLocalCharacters: CharactersMap

    beforeEach(() => {
      const character = { id: '3' } as Character
      updatedLocalCharacters = JSON.parse(JSON.stringify(localCharacters))
      updatedLocalCharacters['3'] = character
    })

    test('should save to both the remote and the local apis', async () => {
      remoteApiMock.putCharacter.mockResolvedValue({ message: 'accepted' })
      return PersistenceMediatorService.putCharacter(updatedLocalCharacters['3'])
        .then(() => {
          expect(remoteApiMock.putCharacter).toHaveBeenCalledWith('3', updatedLocalCharacters['3'])
          expect(localStorage.getItem('mighty_runner_characters')).toEqual(JSON.stringify(updatedLocalCharacters))
        })
    })

    test('should save to localStorage and return an error if the remote api is not available', async () => {
      remoteApiMock.putCharacter.mockRejectedValue({ status: 500 })
      return PersistenceMediatorService.putCharacter(updatedLocalCharacters['3'])
        .then(() => expect('Promise should not have been fulfilled').toBe(''))
        .catch(() => {
          expect(remoteApiMock.putCharacter).toHaveBeenCalledWith('3', updatedLocalCharacters['3'])
          expect(localStorage.getItem('mighty_runner_characters')).toEqual(JSON.stringify(updatedLocalCharacters))
        })
    })
  })
})
