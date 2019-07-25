import { ActiveCharacterStore } from '@state/active-character-store'

export interface EffectableValue {
  [property: string]: number
}

export interface Effectable {
  asTarget: string[]
  name: string
  value: EffectableValue
  effects?: string[],
}

export type AttributeGroup = keyof Pick<ActiveCharacterStore, 'attributes' | 'otherAttributes'>

export interface Attribute extends Effectable {
  shortName: string
  maximum: number
  value: {
    initial: number
    chargen: number
  }
}

export interface Attributes {
  agility: Attribute
}

export type AttributeName = 'agility'

export interface OtherAttributes {
  essence: Attribute
}

export type OtherAttributeName = 'essence'

export interface Effect {
  id: string
  name: string
  target: string[]
  active: boolean
  value: number
}

export class Character {
  userId: string
  id: string
  name: string
}

export class PersistableCharacter extends Character {
  attributes: Attributes
  otherAttributes: OtherAttributes
  effects: Effect[]
}
