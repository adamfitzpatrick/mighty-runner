export interface Attribute {
  initial: number
  maximum: number
  creationPoints: number
  effectTarget: string
  effects: string[]
}

export type SetableAttributeProperties =
  'initial' |
  'maximum' |
  'creationPoints'

export const setableAttributeProperties: SetableAttributeProperties[] = [
  'initial',
  'maximum',
  'creationPoints'
]

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

export class Character {
  static findValue (obj: any, attributePath: string[]): any {
    if (attributePath.length === 0) { return obj }
    const newObj = obj[attributePath.shift()!]
    if (typeof newObj === 'string' || typeof newObj === 'number') {
      return newObj
    }
    return Character.findValue(newObj, attributePath)
  }

  static setValue (obj: any, attributePath: string[], value: any): any {
    if (attributePath.length === 1) {
      obj[attributePath[0]] = value
      return
    }
    const newObj = obj[attributePath.shift()!]
    return Character.setValue(newObj, attributePath, value)
  }

  id: string
  name: string
  attributes: Attributes
  otherAttributes: OtherAttributes
  effects: Effect[]

  constructor (character: Character) {
    this.id = character.id
    this.name = character.name
    this.attributes = {
      agility: { ...character.attributes.agility }
    }
    this.otherAttributes = {
      essence: { ...character.otherAttributes.essence }
    }
    this.effects = character.effects.map(effect => {
      return { ...effect }
    })
  }

  getEffectiveValue (attributePath: string[]): number {
    const attribute = this.findAttribute(attributePath)
    const unEffectedValue = attribute.initial + attribute.creationPoints
    return this.findApplicableEffects(attribute)
      .filter(effect => effect.active)
      .reduce((accum: number, effect: Effect) => {
        return accum + effect.value
      }, unEffectedValue)
  }

  getEffectsForValue(attributePath: string[]): Effect[] {
    return this.findApplicableEffects(this.findAttribute(attributePath))
  }

  getAttributeFromPath (attributePath: string[]): Attribute {
    return JSON.parse(JSON.stringify(Character.findValue(this, [ ...attributePath ])))
  }

  private findAttribute (attributePath: string[]): Attribute {
    const path = attributePath.concat()
    return Character.findValue(this, path) || {} as Attribute
  }

  private findApplicableEffects (attribute: Attribute): Effect[] {
    return this.effects
      .filter(effect => {
        return effect.target === (attribute && attribute.effectTarget)
      })
  }
}
