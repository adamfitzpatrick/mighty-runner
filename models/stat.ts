export interface StatValue {
  [property: string]: number
}

export interface Stat {
  id: string
  name: string
  shortName: string
  description: string
  value: StatValue
  asEffectTarget: string[]
  effects?: string[],
}
