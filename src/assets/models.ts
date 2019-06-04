export interface ImageTransform {
  x: number
  y: number
  scale?: number
}

export interface ImageDefinition {
  url: string
  thumbnailTransform: ImageTransform
  fullViewTransform: ImageTransform
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
}

export interface OtherAttributes {
  edge: number
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
  role: string
  description: string
  age: number,
  sex: string,
  height: string,
  weight: number | string,
  streetCred: number,
  notoriety: number,
  publicAwareness: number,
  karma: number,
  totalKarma: number,
  personalNotes?: string[],
  attributes: AttributeList,
  otherAttributes: OtherAttributes
}
