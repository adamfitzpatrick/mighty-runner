import { Effect, Attributes, SpecialAttributes, PersonalData, GearItem } from '.'

export class CharacterIdentifier {
  userId: string
  id: string
  created: number
  updated: number
  favorite: boolean
}

export class Character extends CharacterIdentifier {
  personalData: PersonalData
  attributes: Attributes
  specialAttributes: SpecialAttributes
  gear: GearItem[]
  effects: Effect[]
}
