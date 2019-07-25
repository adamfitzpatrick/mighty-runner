import { Effectable, Effect } from '@models'
import { ActiveCharacterStore } from '@state/active-character-store'

const getRelatedEffects = (effectable: Effectable, effects: Effect[]) => {
  return effects.filter(effect => {
    return effect.target.every((step, index) => effectable.asTarget[index] === step)
  })
}

const getBaseValue = (effectable: Effectable) => {
  return Object.keys(effectable.value).reduce((sum, key) => sum + effectable.value[key], 0)
}

const getEffectedValue = (effectable: Effectable, effects: Effect[]) => {
  return getBaseValue(effectable) +
    getRelatedEffects(effectable, effects)
      .filter(effect => effect.active)
      .reduce((sum, effect) => sum + effect.value, 0)
}

export default {
  getRelatedEffects,
  getBaseValue,
  getEffectedValue
}
