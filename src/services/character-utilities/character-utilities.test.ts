jest.mock('uuid')
import { v4 } from 'uuid'
import * as utils from './character-utilities'
import { character } from '../../../test-fixtures/character'

describe('character utilites', () => {
  describe('getEffectiveStat utility function', () => {
    test('should return the correct calculated value', () => {
      expect(utils.getEffectiveValue(character.attributes.agility, character.effects)).toBe(7)
    })
  })

  describe('getPhysicalLimit', () => {
    test('should return the limit based on body, strength & reaction', () => {
      expect(utils.getPhysicalLimit(character)).toBe(9)
    })
  })

  describe('getMentalLimit', () => {
    test('should return the limit based on logic, intuition & willpower', () => {
      expect(utils.getMentalLimit(character)).toBe(7)
    })
  })

  describe('getSocialLimit', () => {
    test('should return the limit based on charisma, willpower & essence', () => {
      expect(utils.getSocialLimit(character)).toBe(6)
    })
  })

  describe('getPhysicalConditionMonitor', () => {
    test('should return the number of boxes in the physical condition monitor', () => {
      expect(utils.getPhysicalConditionMonitor(character)).toBe(12)
    })
  })

  describe('getStunConditionMonitor', () => {
    test('should return the number of boxes in the physical condition monitor', () => {
      expect(utils.getStunConditionMonitor(character)).toBe(11)
    })
  })

  describe('generateMinimumViableCharacter', () => {
    test('shold generate a shell which can be saved as a unique character', () => {
      (v4 as jest.Mock).mockReturnValue('ima-fake-uuid')
      localStorage.setItem('mighty_runner_api_access_token', 'token')
      const mvc = utils.generateMinimumViableCharacter()
      expect(mvc.id).toBe('ima-fake-uuid')
      expect(mvc.userId).toBe('token')
      expect(mvc.created).toBeTruthy()
      expect(mvc.updated).toEqual(mvc.created)
    })
  })
})
