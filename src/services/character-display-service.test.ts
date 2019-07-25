import characterDisplay from './character-display-service'
import { Effectable, Effect } from '@models';
import { activeCharacter } from '@state/active-character-store'

describe('characterDisplay service', () => {
  let effectable: Effectable
  let effects: Effect[]

  beforeEach(() => {
    effectable = {
      name: 'Effectable',
      value: { initial: 1, chargen: 5 },
      asTarget: [ 'attributes', 'agility' ]
    }
    effects = [{
      name: 'Effect 1',
      id: '1',
      value: 1,
      active: true,
      target: [ 'attributes', 'agility' ]
    }, {
      name: 'Effect 2',
      id: '2',
      value: 145,
      active: false,
      target: [ 'otherAttributes', 'essence' ]
    }]
  })

  describe('getRelatedEffects', () => {
    test('should return a list of relevant effects when provided with an effectable and effects', () => {
      expect(characterDisplay.getRelatedEffects(effectable, effects)).toEqual([ effects[0] ])
    })
  })

  describe('getBaseValue', () => {
    test('should return the uneffected value of a provided effectable stat', () => {
      expect(characterDisplay.getBaseValue(effectable)).toEqual(6)
    })
  })

  describe('getEffectedValue', () => {
    test('should return the effected value of a given effectable and effects', () => {
      expect(characterDisplay.getEffectedValue(effectable, effects)).toEqual(7)
    })

    test('should only return the value with active effects', () => {
      effects[0].active = false
      expect(characterDisplay.getEffectedValue(effectable, effects)).toEqual(6)
    })
  })
})
