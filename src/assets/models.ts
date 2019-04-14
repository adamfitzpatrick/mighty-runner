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

export type Attribute = keyof AttributeList

export interface CharacterModel {
  id: string
  image: ImageDefinition
  name: string
  metatype: string
  ethnicity: string
  brief: string
  description: string
  attributes: AttributeList
}

export const Colors = {
  colorBlack: 'rgb(0, 0, 0)',
  colorWhite: 'rgb(255, 255, 255)',
  colorDarkest: 'rgb(16, 32, 48)',
  colorDark: 'rgb(23, 45, 68)',
  colorGreen: 'rgb(66, 158, 162)',
  colorRed: 'rgb(167, 35, 26)',
  colorLightGrey: 'rgb(200, 200, 200)'
}
