import { Effect, Attributes, SpecialAttributes, PersonalData } from '.'

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
