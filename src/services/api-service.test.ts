import ApiService from './api-service'
import * as jestFetchMock from 'jest-fetch-mock'

describe('ApiService', () => {
  let token: string
  let customGlobal = global as jestFetchMock.GlobalWithFetchMock
  let apiService: ApiService

  beforeEach(() => {
    localStorage.clear()
    customGlobal.fetch = (jestFetchMock as jestFetchMock.FetchMock)
    customGlobal.fetchMock = customGlobal.fetch

    token = 'api-access-token'
  })

  describe('getCharacterList', () => {
    test('returns a rejected promise if there is no token', () => {
      expect(ApiService.getCharacterList()).rejects.toThrow(/token is missing/)
    })

    test('requests a list of characters', () => {
      localStorage.setItem(ApiService.TOKEN_LOCAL_STORAGE_KEY, 'token')
      fetchMock.mockResponseOnce(JSON.stringify([]))
      const expectedHeaders = new Headers({
        Authorization: `Bearer token`
      })

      return ApiService.getCharacterList().then((data: any) => {
        expect(fetchMock).toHaveBeenCalledWith(
          'http://localhost:3001',
          {  headers: expectedHeaders }
        )
        expect(data).toEqual([])
      })
    })
  })
})
