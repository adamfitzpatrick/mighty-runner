export interface ImageTransform {
  x: number
  y: number
  scale?: number
}

export interface ImageDefinition {
  url: string
  thumbnailTransform: ImageTransform
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

export type Attributes = keyof AttributeList

export interface CharacterModel {
  id: string
  image: ImageDefinition
  name: string
  metatype: string
  brief: string
  description: string
  attributes: AttributeList
}
