import { Effectable } from '.'

export interface Attribute extends Effectable {
  shortName: string
  maximum: number
  value: {
    initial: number
    chargen: number
  }
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
