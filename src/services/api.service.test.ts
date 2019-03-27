import ApiService from './api.service'
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

    apiService = new ApiService(token)
  })

  describe('constructor', () => {
    test('stores api access token when provided', () => {
      expect(localStorage.getItem(ApiService.TOKEN_STORAGE_ITEM_NAME)).toBe(token)
    })

    test('obtains token from localStorage when not provided', () => {
      localStorage.setItem(ApiService.TOKEN_STORAGE_ITEM_NAME, 'existing-token')
      apiService = new ApiService()
      expect(apiService.token).toBe('existing-token')
    })
  })

  describe('getCharacterList', () => {
    test('returns a rejected promise if there is no token', () => {
      delete apiService.token
      expect(apiService.getCharacterList()).rejects.toMatch(/token is missing/)
    })

    test('requests a list of characters', () => {
      fetchMock.mockResponseOnce(JSON.stringify([]))
      const expectedHeaders = new Headers({
        Authorization: `Bearer ${token}`
      })

      return apiService.getCharacterList().then((data: any) => {
        expect(fetchMock).toHaveBeenCalledWith(
          'http://localhost:3001',
          {  headers: expectedHeaders }
        )
        expect(data).toEqual([])
      })
    })
  })
})
