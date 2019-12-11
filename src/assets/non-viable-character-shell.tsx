import { Character } from '@models'

export const getNonViableCharacterShell = (): Character => ({
  favorite: false,
  pic: {
    url: '',
    thumbUrl: '',
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
    name: '',
    role: '',
    description: '',
    ethnicity: '',
    metatype: '',
    gender: '',
    age: 0,
    weight: '',
    height: '',
    karma: 0,
    streetCred: 0,
    notoriety: 0,
    publicAwareness: 0,
    totalKarma: 0,
    nuyen: 0,
    lifestyle: ''
  },
  attributes: {
    body: {
      id: 'body',
      name: 'Body',
      shortName: 'bod',
      description: 'Body',
      asEffectTarget: [ 'attributes', 'body' ],
      value: { initial: 0, chargen: 0 },
      maximum: 0
    },
    agility: {
      id: 'agility',
      name: 'Agility',
      shortName: 'agi',
      description: 'Agility',
      asEffectTarget: [ 'attributes', 'agility' ],
      value: { initial: 0, chargen: 0 },
      maximum: 0
    },
    reaction: {
      id: 'reaction',
      name: 'Reaction',
      shortName: 'rea',
      description: 'Reaction',
      asEffectTarget: [ 'attributes', 'reaction' ],
      value: { initial: 0, chargen: 0 },
      maximum: 0
    },
    strength: {
      id: 'strength',
      name: 'Strength',
      shortName: 'str',
      description: 'Strength',
      asEffectTarget: [ 'attributes', 'strength' ],
      value: { initial: 0, chargen: 0 },
      maximum: 0
    },
    logic: {
      id: 'logic',
      name: 'Logic',
      shortName: 'log',
      description: 'Logic',
      asEffectTarget: [ 'attributes', 'logic' ],
      value: { initial: 0, chargen: 0 },
      maximum: 0
    },
    willpower: {
      id: 'willpower',
      name: 'Willpower',
      shortName: 'wil',
      description: 'Willpower',
      asEffectTarget: [ 'attributes', 'willpower' ],
      value: { initial: 0, chargen: 0 },
      maximum: 0
    },
    intuition: {
      id: 'intuition',
      name: 'Intuition',
      shortName: 'int',
      description: 'Intuition',
      asEffectTarget: [ 'attributes', 'intuition' ],
      value: { initial: 0, chargen: 0 },
      maximum: 0
    },
    charisma: {
      id: 'charisma',
      name: 'Charisma',
      shortName: 'cha',
      description: 'Charisma',
      asEffectTarget: [ 'attributes', 'charisma' ],
      value: { initial: 0, chargen: 0 },
      maximum: 0
    },
    essence: {
      id: 'essence',
      name: 'Essence',
      shortName: 'ess',
      description: 'Essence',
      asEffectTarget: [ 'attributes', 'essence' ],
      value: { initial: 0, chargen: 0 },
      maximum: 0
    }
  },
  gear: [],
  effects: [],
  specialAttributes: {
    edge: {
      id: 'edge',
      name: 'Edge',
      shortName: 'edg',
      description: 'Edge',
      asEffectTarget: [ 'specialAttributes', 'edge' ],
      value: { initial: 0, chargen: 0 },
      maximum: 0
    },
    magic: {
      id: 'magic',
      name: 'Magic',
      shortName: 'mag',
      description: 'Magic',
      asEffectTarget: [ 'specialAttributes', 'magic' ],
      value: { initial: 6, chargen: 0 },
      maximum: 0
    },
    resonance: {
      id: 'resonance',
      name: 'Resonance',
      shortName: 'res',
      description: 'Resonance',
      asEffectTarget: [ 'specialAttributes', 'resonance' ],
      value: { initial: 0, chargen: 0 },
      maximum: 0
    }
  }
} as any as Character)
