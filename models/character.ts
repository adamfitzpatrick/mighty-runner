import { Effect, Attributes, SpecialAttributes, PersonalData, GearItem, Pic } from '.'

export interface CharacterIdentifier {
  userId: string
  id: string
  created: number
  updated: number
  favorite: boolean
}

export interface Character extends CharacterIdentifier {
  pic: Pic
  personalData: PersonalData
  attributes: Attributes
  specialAttributes: SpecialAttributes
  gear: GearItem[]
  effects: Effect[]
}
