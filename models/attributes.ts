import { Stat } from '.'

export interface Attribute extends Stat {
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
