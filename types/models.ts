export interface ImageTransform {
  x: number
  y: number
  scale?: number
}

export interface ImageDefinition {
  url: string
  thumbnailTransform: ImageTransform
}

export interface AttributeList {
  body: number
  agility: number
  reaction: number
  strength: number
  willpower: number
  logic: number
  intuition: number
  charisma: number
  edge: number
}

export interface OtherAttributes {
  essence: number
  'Magic/Resonance': number
  initiative: string
  matrixInitiative: string
  astralInitiative: string
  composure: number
  judgeIntentions: number
  memory: number
  'Lift/Carry': number
  movement: string
}

export type Attribute = keyof AttributeList

export interface CharacterModel {
  id: string
  image: ImageDefinition
  name: string
  metatype: string
  ethnicity: string
  brief: string
  description: string
  age: number,
  sex: string,
  height: string,
  weight: number | string,
  streetCred: number,
  notoriety: number,
  publicAwareness: number,
  karma: number,
  lifetimeKarma: number,
  personalNotes: string[],
  attributes: AttributeList
}
