import * as apiErrorActions from './api-error.actions'
import { AnyAction, Dispatch } from 'redux'

describe('api-error actions', () => {
  let dispatchSpy: Dispatch<AnyAction>

  beforeEach(() => {
    dispatchSpy = jest.fn()
  })

  describe('setApiErrorCreator', () => {
    test('should return a function to dispatch the SET_API_ERROR action', () => {
      apiErrorActions.setApiErrorCreator(dispatchSpy)()
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: apiErrorActions.ApiErrorAction.SET_API_ERROR
      })
    })
  })

  describe('setApiHealthyCreator', () => {
    test('should return a function to dispatch the SET_API_HEALTHY action', () => {
      apiErrorActions.setApiHealthyCreator(dispatchSpy)()
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: apiErrorActions.ApiErrorAction.SET_API_HEALTHY
      })
    })
  })
})
