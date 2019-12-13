import * as RemoteApiService from '.'
import * as jestFetchMock from 'jest-fetch-mock'
import { Character } from '@models'

describe('ApiService', () => {
  let token: string
  let fetchMock: jestFetchMock.FetchMock

  function removeToken () { localStorage.removeItem(RemoteApiService.TOKEN_LOCAL_STORAGE_KEY) }
  beforeEach(() => {
    (global as jestFetchMock.GlobalWithFetchMock).fetch = (jestFetchMock as jestFetchMock.FetchMock)
    fetchMock = (global as jestFetchMock.GlobalWithFetchMock).fetch

    localStorage.clear()
    token = 'api-access-token'
    localStorage.setItem(RemoteApiService.TOKEN_LOCAL_STORAGE_KEY, 'token')
  })

  describe('getCharacterList', () => {
    test('returns a rejected promise if there is no token', () => {
      removeToken()
      return expect(RemoteApiService.getCharacterList()).rejects.toThrow(/token is missing/)
    })

    test('returns a rejected promise if the token is invalid or unauthorized', () => {
      fetchMock.mockResponseOnce('', { status: 403 })
      return expect(RemoteApiService.getCharacterList()).rejects.toThrow()
    })

    test('returns a rejected promise if the request returns a > 399 status', () => {
      fetchMock.mockResponseOnce('', { status: 400 })
      return expect(RemoteApiService.getCharacterList()).rejects.toHaveProperty('status', 400)
    })

    test('returns a rejected promise if the request fails', () => {
      fetchMock.mockRejectOnce(new Error('error'))
      return expect(RemoteApiService.getCharacterList()).rejects.toThrow(/error/)
    })

    test('requests a list of characters', () => {
      fetchMock.mockResponseOnce(JSON.stringify([]), { status: 200 })
      const expectedHeaders = new Headers({
        Authorization: `Bearer token`
      })

      return RemoteApiService.getCharacterList().then((data: any) => {
        expect(fetchMock).toHaveBeenCalledWith(
          'testing-url/character',
          {  headers: expectedHeaders }
        )
        expect(data).toEqual([])
      })
    })
  })

  describe('getCharacter', () => {
    test('returns a rejected promise if there is no token', () => {
      removeToken()
      return expect(RemoteApiService.getCharacter('character-id')).rejects.toThrow(/token is missing/)
    })

    test('returns a rejected promise if the request fails', () => {
      fetchMock.mockRejectOnce(new Error('error'))
      return expect(RemoteApiService.getCharacter('character-id')).rejects.toThrow(/error/)
    })

    test('returns a the response with a single character', () => {
      fetchMock.mockResponseOnce(JSON.stringify({}))
      const expectedHeaders = new Headers({
        Authorization: 'Bearer token'
      })

      return RemoteApiService.getCharacter('character-id').then((data: any) => {
        expect(fetchMock).toHaveBeenCalledWith(
          'testing-url/character/character-id',
          { headers: expectedHeaders }
        )
        expect(data).toEqual({})
      })
    })
  })

  describe('putCharacter', () => {
    test('returns a rejected promise if there is no token', () => {
      removeToken()
      return expect(RemoteApiService.putCharacter('character-id', {} as Character)).rejects.toThrow(/token is missing/)
    })

    test('returns a rejected promise if the request fails', () => {
      fetchMock.mockRejectOnce(new Error('error'))
      return expect(RemoteApiService.putCharacter('character-id', {} as Character)).rejects.toThrow(/error/)
    })

    test('returns the accepted response if the request succeeds', () => {
      fetchMock.mockResponseOnce(JSON.stringify({ message: 'accepted' }))
      const expectedHeaders = new Headers({
        Authorization: 'Bearer token'
      })

      return RemoteApiService.putCharacter('character-id', {} as Character).then((data: any) => {
        expect(fetchMock).toHaveBeenCalledWith(
          'testing-url/character/character-id',
          {
            method: 'PUT',
            body: '{}',
            headers: expectedHeaders
          }
        )
        expect(data).toEqual({ message: 'accepted' })
      })
    })
  })
})
