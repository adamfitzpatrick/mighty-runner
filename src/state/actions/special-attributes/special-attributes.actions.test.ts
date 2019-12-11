import * as specialAttributesActions from './special-attributes.actions'
import { AnyAction, Dispatch } from 'redux'
import { SpecialAttributes } from '@models'

describe('special attributes actions', () => {
  let dispatchSpy: Dispatch<AnyAction>

  beforeEach(() => {
    dispatchSpy = jest.fn()
  })

  describe('setSpecialAttributesCreator', () => {
    test('should return a function to dispatch the SET_SPECIAL_ATTRIBUTES action', () => {
      specialAttributesActions.setSpecialAttributesCreator(dispatchSpy)({} as SpecialAttributes)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: specialAttributesActions.SpecialAttributesAction.SET_SPECIAL_ATTRIBUTES,
        payload: {}
      })
    })
  })
})
