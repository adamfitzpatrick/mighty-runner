import * as utils from './character-utilities'
import { character } from '../../../test-fixtures/character'
import { Stat } from '@models'

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
})
