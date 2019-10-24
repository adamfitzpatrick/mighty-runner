import * as gearActions from './gear.actions'
import { AnyAction, Dispatch } from 'redux'
import { GearItem } from '@models'

describe('gear actions', () => {
  let dispatchSpy: Dispatch<AnyAction>

  beforeEach(() => {
    dispatchSpy = jest.fn()
  })

  describe('setGearCreator', () => {
    test('should return a function to dispatch the SET_GEAR action', () => {
      gearActions.setGearCreator(dispatchSpy)([] as GearItem[])
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: gearActions.GearAction.SET_GEAR,
        payload: []
      })
    })
  })

  describe('updateGearCreator', () => {
    test('should return a function to dispatch the UPDATE_GEAR action', () => {
      gearActions.updateGearCreator(dispatchSpy)({} as GearItem)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: gearActions.GearAction.UPDATE_GEAR,
        payload: {}
      })
    })
  })

  describe('addGearCreator', () => {
    test('should return a function to dispatch the ADD_GEAR action', () => {
      gearActions.addGearCreator(dispatchSpy)({} as GearItem)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: gearActions.GearAction.ADD_GEAR,
        payload: {}
      })
    })
  })

  describe('removeGearCreator', () => {
    test('should return a function to dispatch the REMOVE_GEAR action', () => {
      gearActions.removeGearCreator(dispatchSpy)({} as GearItem)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: gearActions.GearAction.REMOVE_GEAR,
        payload: {}
      })
    })
  })
})
