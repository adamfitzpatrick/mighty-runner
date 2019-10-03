import { gear as gearReducer } from './gear.reducer'
import { GearAction } from '@state/actions'
import { GearItem } from '@models'

describe('gear reducer', () => {
  let gearItem: GearItem
  let state: GearItem[] | null | undefined

  beforeEach(() => {
    gearItem = {
      id: '1',
      name: 'n',
      shortName: 's',
      description: 'd',
      asEffectTarget: [ 'a', 'b' ],
      effects: [ '1' ],
      cost: 1,
      availability: '6R',
      value: { rating: 3 }
    }
    state = null
  })

  describe('with undefined state', () => {
    state = undefined
    const action = {
      type: 'NOT_AN_ACTION' as GearAction,
      payload: gearItem
    }
    expect(gearReducer(state, action)).toEqual(null)
  })

  describe('SET_GEAR', () => {
    test('should return the payload', () => {
      const action = {
        type: GearAction.SET_GEAR,
        payload: [ gearItem ]
      }
      expect(gearReducer(state, action)).toEqual([ gearItem ])
    })
  })

  describe('UPDATE_GEAR', () => {
    test('should return the existing state with the payload item replaced', () => {
      const otherGear = { ...gearItem }
      otherGear.id = '2'
      state = [ { ...gearItem }, otherGear ]
      gearItem.name = 'different'
      const action = {
        type: GearAction.UPDATE_GEAR,
        payload: gearItem
      }
      expect(gearReducer(state, action)).toEqual([ gearItem, otherGear ])
    })
  })

  describe('ADD_GEAR', () => {
    test('should return the existing state with the payload added', () => {
      state = [{ ...gearItem }]
      gearItem.id = '2'
      const action = {
        type: GearAction.ADD_GEAR,
        payload: gearItem
      }
      expect(gearReducer(state, action)).toEqual([ ...state, gearItem ])
    })
  })

  describe('REMOVE_GEAR', () => {
    test('should return the existing state with the payload removed', () => {
      state = [{ ...gearItem }]
      const action = {
        type: GearAction.REMOVE_GEAR,
        payload: gearItem
      }
      expect(gearReducer(state, action)).toEqual([])
    })

    test('should return the existing state unchanged if there is no match to the payload', () => {
      state = [{ ...gearItem }]
      gearItem.id = '2'
      const action = {
        type: GearAction.REMOVE_GEAR,
        payload: gearItem
      }
      expect(gearReducer(state, action)).toEqual(state)
    })
  })
})
