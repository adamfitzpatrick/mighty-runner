import { Effect, Attributes, SpecialAttributes, PersonalData, GearItem } from '.'

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
  gear: GearItem[]
  effects: Effect[]
}
