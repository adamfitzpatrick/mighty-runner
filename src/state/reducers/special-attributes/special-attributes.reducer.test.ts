import { specialAttributes as specialAttributesReducer } from './special-attributes.reducer'
import { SpecialAttributes } from '@models'
import { SpecialAttributesAction } from '@state/actions/special-attributes'

describe('special attributes reducer', () => {
  let data: SpecialAttributes
  let state: SpecialAttributes | null | undefined

  beforeEach(() => {
    data = {
      edge: {},
      magic: {},
      resonance: {}
    } as SpecialAttributes
    state = null
  })

  describe('with undefined state', () => {
    state = undefined
    const action = {
      type: 'NOT_AN_ACTION' as SpecialAttributesAction,
      payload: data
    }
    expect(specialAttributesReducer(state, action)).toEqual(null)
  })

  describe('SET_SPECIAL_ATTRIBUTES', () => {
    test('should return the payload', () => {
      const action = {
        type: SpecialAttributesAction.SET_SPECIAL_ATTRIBUTES,
        payload: data
      }
      expect(specialAttributesReducer(state, action)).toEqual(data)
    })
  })
})
