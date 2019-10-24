import * as attributeActions from './attributes.actions'
import { AnyAction, Dispatch } from 'redux'
import { Attributes, Attribute } from '@models'

describe('attributes actions', () => {
  let dispatchSpy: Dispatch<AnyAction>

  beforeEach(() => {
    dispatchSpy = jest.fn()
  })

  describe('setAttributesCreator', () => {
    test('should return a function to dispatch the SET_ATTRIBUTES action', () => {
      attributeActions.setAttributesCreator(dispatchSpy)({} as Attributes)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: attributeActions.AttributesAction.SET_ATTRIBUTES,
        payload: {}
      })
    })
  })

  describe('updateAttributeCreator', () => {
    test('should return a function to dispatch the UPDATE_ATTRIBUTE action', () => {
      attributeActions.updateAttributeCreator(dispatchSpy)('attribute', {} as Attribute)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: attributeActions.AttributesAction.UPDATE_ATTRIBUTE,
        payload: {
          name: 'attribute',
          attribute: {}
        }
      })
    })
  })
})
