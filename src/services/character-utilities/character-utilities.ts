import { Effect, Character, Stat } from '@models'

export function getEffectiveValue (stat: Stat, effects: Effect[]) {
  const baseValue = Object.keys(stat.value).reduce((accum: number, part: string) => accum + stat.value[part], 0)
  const modifier = effects
    .filter(effect => {
      return effect.active && effect.target.every((element, index) => element === stat.asEffectTarget[index])
    })
    .reduce((sum, effect) => sum + effect.value, 0)

  return baseValue + modifier
}

export function getPhysicalLimit (character: Character) {
  const str = getEffectiveValue(character.attributes.strength, character.effects)
  const bod = getEffectiveValue(character.attributes.body, character.effects)
  const rea = getEffectiveValue(character.attributes.reaction, character.effects)
  return Math.ceil((str * 2 + bod + rea) / 3)
}

export function getMentalLimit (character: Character) {
  const log = getEffectiveValue(character.attributes.logic, character.effects)
  const int = getEffectiveValue(character.attributes.intuition, character.effects)
  const wil = getEffectiveValue(character.attributes.willpower, character.effects)
  return Math.ceil((log * 2 + int + wil) / 3)
}

export function getSocialLimit (character: Character) {
  const cha = getEffectiveValue(character.attributes.charisma, character.effects)
  const wil = getEffectiveValue(character.attributes.willpower, character.effects)
  const ess = getEffectiveValue(character.attributes.essence, character.effects)
  return Math.ceil((cha * 2 + wil + ess) / 3)
}

export function getPhysicalConditionMonitor (character: Character) {
  return Math.ceil(
    getEffectiveValue(character.attributes.body, character.effects) / 2 + 8
  )
}

export function getStunConditionMonitor (character: Character) {
  return Math.ceil(
    getEffectiveValue(character.attributes.willpower, character.effects) / 2 + 8
  )
}
