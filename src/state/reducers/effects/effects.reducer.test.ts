import { effects as effectReducer } from './effects.reducer'
import { EffectsAction } from '../../actions/effects.actions'
import { Effect } from '@models'

describe('effects reducer', () => {
  let effect: Effect
  let state: Effect[] | null

  beforeEach(() => {
    effect = {
      id: '1',
      name: 'n',
      description: 'd',
      target: [ 'a', 'b' ],
      value: 1,
      active: true
    }
    state = null
  })

  describe('with undefined state', () => {
    it('should accept an undefined state and return a null one', () => {
      const action = {
        type: 'NOT_AN_ACTION' as EffectsAction,
        payload: effect
      }
      expect(effectReducer(undefined, action)).toBe(null)
    })
  })

  describe('SET_EFFECTS', () => {
    it('should set the effects state', () => {
      const action = {
        type: EffectsAction.SET_EFFECTS,
        payload: [ effect ]
      }
      expect(effectReducer(state, action)).toBe(action.payload)
    })
  })

  describe('UPDATE_EFFECT', () => {
    it('should return the state with the payload effect replaced', () => {
      const otherEffect = { ...effect }
      otherEffect.id = '2'
      state = [ { ...effect }, otherEffect ]
      effect.name = 'changed'
      const action = {
        type: EffectsAction.UPDATE_EFFECT,
        payload: effect
      }
      expect(effectReducer(state, action)).toEqual([ effect, otherEffect ])
    })
  })

  describe('ADD_EFFECT', () => {
    it('should return the state with the payload appended', () => {
      const newEffect = { ...effect }
      newEffect.id = '2'
      state = [ effect ]
      const action = {
        type: EffectsAction.ADD_EFFECT,
        payload: newEffect
      }
      expect(effectReducer(state, action)).toEqual([ effect, newEffect ])
    })
  })

  describe('REMOVE_EFFECT', () => {
    it('should return the state with the payload effect remove', () => {
      const otherEffect = { ...effect }
      otherEffect.id = '2'
      state = [ { ...effect }, otherEffect ]
      const action = {
        type: EffectsAction.REMOVE_EFFECT,
        payload: { id: '1' } as Effect
      }
      expect(effectReducer(state, action)).toEqual([ otherEffect ])
    })

    it('should return the state unchanged if a matching effect is not found', () => {
      const otherEffect = { ...effect }
      otherEffect.id = '2'
      state = [ { ...effect }, otherEffect ]
      const action = {
        type: EffectsAction.REMOVE_EFFECT,
        payload: { id: '?' } as Effect
      }
      expect(effectReducer(state, action)).toEqual([ effect, otherEffect ])
    })
  })
})
