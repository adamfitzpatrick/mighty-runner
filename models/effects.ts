export interface EffectableValue {
  [property: string]: number
}

export interface Effectable {
  asTarget: string[]
  name: string
  value: EffectableValue
  effects?: string[],
}

export interface Effect {
  id: string
  name: string
  target: string[]
  active: boolean
  value: number
}
