import { apiError as apiErrorReducer } from './api-error.reducer'
import { ApiErrorAction } from '@state/actions'

describe('api-error reducer', () => {
  describe('with undefined state', () => {
    test('should accept an undefined state and return a false one', () => {
      const action = {
        type: 'NOT_AN_ACTION' as ApiErrorAction
      }
      expect(apiErrorReducer(undefined, action)).toBe(false)
    })
  })

  describe('SET_API_ERROR', () => {
    test('should set the api error state', () => {
      const action = { type: ApiErrorAction.SET_API_ERROR }
      expect(apiErrorReducer(false, action)).toBe(true)
    })
  })

  describe('SET_API_HEALTHY', () => {
    test('should resolve the api error state', () => {
      const action = { type: ApiErrorAction.SET_API_HEALTHY }
      expect(apiErrorReducer(true, action)).toBe(false)
    })
  })
})
