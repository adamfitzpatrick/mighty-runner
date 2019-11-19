import { Character } from '@models'

export const character: Character = {
  id: '1',
  userId: 'A',
  created: 1,
  updated: 2,
  favorite: false,
  pic: {
    url: 'url',
    thumbUrl: 'thumb',
    thumbnailTransform: {
      x: 0,
      y: 0,
      scale: 1,
      originalHeight: 100,
      originalWidth: 100
    },
    fullTransform: {
      x: 0,
      y: 0,
      scale: 1,
      originalHeight: 100,
      originalWidth: 100
    }
  },
  personalData: {
    name: 'Name',
    role: 'Role',
    description: 'Description',
    ethnicity: 'African',
    metatype: 'Elf',
    gender: 'n',
    age: 20,
    weight: '150',
    height: '1\'',
    karma: 10,
    streetCred: 2,
    notoriety: 1,
    publicAwareness: 1,
    totalKarma: 20,
    nuyen: 10000,
    lifestyle: 'Low'
  },
  attributes: {
    body: {
      id: 'body',
      name: 'Body',
      shortName: 'bod',
      description: 'd',
      asEffectTarget: [ 'attributes', 'body' ],
      value: { initial: 0, chargen: 6 },
      maximum: 6
    },
    agility: {
      id: 'agility',
      name: 'Agility',
      shortName: 'agi',
      description: 'd',
      asEffectTarget: [ 'attributes', 'agility' ],
      value: { initial: 0, chargen: 6 },
      maximum: 6
    },
    reaction: {
      id: 'reaction',
      name: 'Reaction',
      shortName: 'rea',
      description: 'd',
      asEffectTarget: [ 'attributes', 'reaction' ],
      value: { initial: 0, chargen: 6 },
      maximum: 6
    },
    strength: {
      id: 'strength',
      name: 'Strength',
      shortName: 'str',
      description: 'd',
      asEffectTarget: [ 'attributes', 'strength' ],
      value: { initial: 0, chargen: 6 },
      maximum: 6
    },
    logic: {
      id: 'logic',
      name: 'Logic',
      shortName: 'log',
      description: 'd',
      asEffectTarget: [ 'attributes', 'logic' ],
      value: { initial: 0, chargen: 3 },
      maximum: 6
    },
    willpower: {
      id: 'willpower',
      name: 'Willpower',
      shortName: 'wil',
      description: 'd',
      asEffectTarget: [ 'attributes', 'willpower' ],
      value: { initial: 0, chargen: 6 },
      maximum: 6
    },
    intuition: {
      id: 'intuition',
      name: 'Intuition',
      shortName: 'int',
      description: 'd',
      asEffectTarget: [ 'attributes', 'intuition' ],
      value: { initial: 0, chargen: 6 },
      maximum: 6
    },
    charisma: {
      id: 'charisma',
      name: 'Charisma',
      shortName: 'cha',
      description: 'd',
      asEffectTarget: [ 'attributes', 'charisma' ],
      value: { initial: 0, chargen: 2 },
      maximum: 6
    },
    essence: {
      id: 'essence',
      name: 'Essence',
      shortName: 'ess',
      description: 'd',
      asEffectTarget: [ 'attributes', 'essence' ],
      value: { initial: 0, chargen: 6 },
      maximum: 6
    }
  },
  gear: [],
  effects: [{
    id: '1',
    name: 'n',
    description: 'd',
    target: [ 'attributes', 'agility' ],
    value: 1,
    active: true
  }, {
    id: '2',
    name: 'n',
    description: 'd',
    target: [ 'attributes', 'agility' ],
    value: 1,
    active: false
  }, {
    id: '3',
    name: 'n',
    description: 'd',
    target: [ 'attributes', 'body' ],
    value: 1,
    active: true
  }, {
    id: '3',
    name: 'n',
    description: 'd',
    target: [ 'attributes', 'logic' ],
    value: 1,
    active: true
  }, {
    id: '3',
    name: 'n',
    description: 'd',
    target: [ 'attributes', 'charisma' ],
    value: 1,
    active: true
  }],
  specialAttributes: {
    edge: {
      id: 'edge',
      name: 'Edge',
      shortName: 'edg',
      description: 'd',
      asEffectTarget: [ 'specialAttributes', 'edge' ],
      value: { initial: 0, chargen: 6 },
      maximum: 6
    },
    magic: {
      id: 'magic',
      name: 'Magic',
      shortName: 'mag',
      description: 'd',
      asEffectTarget: [ 'specialAttributes', 'magic' ],
      value: { initial: 6, chargen: 0 },
      maximum: 6
    },
    resonance: {
      id: 'resonance',
      name: 'Resonance',
      shortName: 'res',
      description: 'd',
      asEffectTarget: [ 'specialAttributes', 'resonance' ],
      value: { initial: 0, chargen: 0 },
      maximum: 6
    }
  }
}
