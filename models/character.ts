export interface Attribute {
  initial: number
  maximum: number
  creationPoints: number
  effectTarget: string
  effects: string[]
}

export interface Attributes {
  agility: Attribute
}

export interface OtherAttributes {
  essence: Attribute
}

export interface Effect {
  id: string
  name: string
  target: string
  active: boolean
  value: number
}

export interface Character {
  id: string
  name: string
  attributes: Attributes
  otherAttributes: OtherAttributes
  effects: Effect[]
}
