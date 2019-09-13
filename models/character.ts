import { PersonalData } from './personal-data'

export interface EffectableValue {
  [property: string]: number
}

export interface Effectable {
  asTarget: string[]
  name: string
  value: EffectableValue
  effects?: string[],
}

export interface Attribute extends Effectable {
  shortName: string
  maximum: number
  value: {
    initial: number
    chargen: number
  }
}

export interface Effect {
  id: string
  name: string
  target: string[]
  active: boolean
  value: number
}

export interface Attributes {
  body: Attribute
  agility: Attribute
  reaction: Attribute
  strength: Attribute
  willpower: Attribute
  logic: Attribute
  intuition: Attribute
  charisma: Attribute
  essence: Attribute
}

export interface SpecialAttributes {
  edge: Attribute
  magic: Attribute
  resonance: Attribute
}

export interface Gear {
  id: string
  name: string
  description: string
  cost: number
  availability: string
  effects: string[]
}

export class CharacterIdentifier {
  userId: string
  id: string
}

export class Character extends CharacterIdentifier {
  userId: string
  id: string
  personalData: PersonalData
  attributes: Attributes
  specialAttributes: SpecialAttributes
  gear: Gear[]
  effects: Effect[]
}
