import { defaultState } from '@state/default-state'
import { Action } from '@state/actions'
import { GearAction } from '@state/actions/gear.actions'
import { GearItem } from '@models'

const getGearWithReplacement = (gear: GearItem[], replacement: GearItem): GearItem[] => {
  const updatedArray = [ ...gear ]
  updatedArray[updatedArray.findIndex(item => item.id === replacement.id)] = replacement
  return updatedArray
}

export function gear (
  state: GearItem[] | null = defaultState.gear,
  action: Action<GearAction, GearItem[] | GearItem>
) {
  switch (action.type) {
    case GearAction.SET_GEAR:
      return action.payload as GearItem[]
    case GearAction.UPDATE_GEAR:
      if (state) {
        return getGearWithReplacement(state, action.payload as GearItem)
      }
      return state
    default:
      return state
  }
}
