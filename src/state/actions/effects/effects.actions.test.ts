import * as effectsActions from './effects.actions'
import { AnyAction, Dispatch } from 'redux'
import { Effect } from '@models'

describe('effects actions', () => {
  let dispatchSpy: Dispatch<AnyAction>

  beforeEach(() => {
    dispatchSpy = jest.fn()
  })

  describe('setEffectsCreator', () => {
    test('should return a function to dispatch the SET_EFFECTS action', () => {
      effectsActions.setEffectsCreator(dispatchSpy)([] as Effect[])
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: effectsActions.EffectsAction.SET_EFFECTS,
        payload: []
      })
    })
  })

  describe('updateEffectCreator', () => {
    test('should return a function to dispatch the UPDATE_EFFECT action', () => {
      effectsActions.updateEffectCreator(dispatchSpy)({} as Effect)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: effectsActions.EffectsAction.UPDATE_EFFECT,
        payload: {}
      })
    })
  })

  describe('addEffectCreator', () => {
    test('should return a function to dispatch the ADD_EFFECT action', () => {
      effectsActions.addEffectCreator(dispatchSpy)({} as Effect)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: effectsActions.EffectsAction.ADD_EFFECT,
        payload: {}
      })
    })
  })

  describe('removeEffectCreator', () => {
    test('should return a function to dispatch the REMOVE_EFFECT action', () => {
      effectsActions.removeEffectCreator(dispatchSpy)({} as Effect)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: effectsActions.EffectsAction.REMOVE_EFFECT,
        payload: {}
      })
    })
  })
})
