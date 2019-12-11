import { v4 } from 'uuid'

import { Effect, Character, Stat } from '@models'
import { getNonViableCharacterShell } from '@assets/non-viable-character-shell'
import ApiService from '@services/api-service'

export function getEffectiveValue (stat: Stat, effects: Effect[]): number {
  const baseValue = Object.keys(stat.value).reduce((accum: number, part: string) => accum + stat.value[part], 0)
  const modifier = effects
    .filter(effect => {
      return effect.active && effect.target.every((element, index) => element === stat.asEffectTarget[index])
    })
    .reduce((sum, effect) => sum + effect.value, 0)

  return baseValue + modifier
}

export function getPhysicalLimit (character: Character): number {
  const str = getEffectiveValue(character.attributes.strength, character.effects)
  const bod = getEffectiveValue(character.attributes.body, character.effects)
  const rea = getEffectiveValue(character.attributes.reaction, character.effects)
  return Math.ceil((str * 2 + bod + rea) / 3)
}

export function getMentalLimit (character: Character): number {
  const log = getEffectiveValue(character.attributes.logic, character.effects)
  const int = getEffectiveValue(character.attributes.intuition, character.effects)
  const wil = getEffectiveValue(character.attributes.willpower, character.effects)
  return Math.ceil((log * 2 + int + wil) / 3)
}

export function getSocialLimit (character: Character): number {
  const cha = getEffectiveValue(character.attributes.charisma, character.effects)
  const wil = getEffectiveValue(character.attributes.willpower, character.effects)
  const ess = getEffectiveValue(character.attributes.essence, character.effects)
  return Math.ceil((cha * 2 + wil + ess) / 3)
}

export function getPhysicalConditionMonitor (character: Character): number {
  return Math.ceil(
    getEffectiveValue(character.attributes.body, character.effects) / 2 + 8
  )
}

export function getStunConditionMonitor (character: Character): number {
  return Math.ceil(
    getEffectiveValue(character.attributes.willpower, character.effects) / 2 + 8
  )
}

export function generateMinimumViableCharacter (): Character {
  const mvc = getNonViableCharacterShell()
  mvc.id = v4()
  mvc.userId = localStorage.getItem(ApiService.TOKEN_LOCAL_STORAGE_KEY)!
  const now = new Date().getDate()
  mvc.created = now
  mvc.updated = now
  return mvc
}
