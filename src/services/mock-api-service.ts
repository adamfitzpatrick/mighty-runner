import { Character, Attribute } from '@models'

function getCharacter (...rest: any[]): Promise<Character> {
  return Promise.resolve({
    id: 'seidr',
    name: 'Seidr',
    attributes: {
      agility: {
        initial: 0,
        maximum: 6,
        creationPoints: 4,
        effectTarget: 'Agility',
        effects: []
      }
    },
    otherAttributes: {
      essence: {
        initial: 6,
        maximum: 6,
        creationPoints: 0,
        effectTarget: 'Essence',
        effects: []
      }
    },
    effects: [{
      id: '1',
      target: 'Agility',
      name: 'Improved attribute power',
      active: true,
      value: 1
    }, {
      id: '2',
      target: 'Agility',
      name: 'Way of the Wolf',
      active: true,
      value: 2
    }]
  } as any as Character)
}
