import { MiddlewareAPI, Dispatch, AnyAction } from 'redux'
import { ActiveCharacterAction, AttributesAction, Action, UpdateAttributePayload, GearAction } from '@state/actions'
import { Attributes, Attribute, Effect, Stat, GearItem } from '@models'
import { AppState } from '@state/default-state'

function getCleanStat (stat: Stat, effects: Effect[] | null): Stat {
  if (!stat.effects) { return stat }
  let dirty = false
  const cleanEffectsList = stat.effects.filter(effectId => {
    const remove = !(effects && effects.some(effect => effect.id === effectId))
    if (remove) { dirty = true }
    return !remove
  })
  if (dirty) {
    return { ...stat, effects: cleanEffectsList }
  }
  return stat
}

function checkForChangeAndDispatch<T,P> (
  stat: Stat,
  effects: Effect[] | null,
  dispatch: Dispatch<Action<T,P>>,
  actionType: T,
  payloadMaker: (updated: Stat) => P
) {
  const updated = getCleanStat(stat, effects)
  if (updated !== stat) {
    const action = {
      type: actionType,
      payload: payloadMaker(updated)
    }
    dispatch(action)
  }
}

function cleanAttributes (
  appState: AppState,
  dispatch: Dispatch<Action<AttributesAction, UpdateAttributePayload>>
): void {
  if (!appState.attributes) { return }
  Object.keys(appState.attributes).forEach((key: keyof Attributes) => {
    const payloadMaker = (attribute: Attribute) => ({ name: key, attribute })
    checkForChangeAndDispatch<AttributesAction, UpdateAttributePayload>(
      appState.attributes![key], appState.effects, dispatch, AttributesAction.UPDATE_ATTRIBUTE, payloadMaker
    )
  })
}

function cleanGear (
  appState: AppState,
  dispatch: Dispatch<Action<GearAction, GearItem>>
) {
  const payloadMaker = (item: GearItem) => item
  if (!appState.gear) { return }
  appState.gear.forEach(item => {
    checkForChangeAndDispatch<GearAction, GearItem>(
      item, appState.effects, dispatch, GearAction.UPDATE_GEAR, payloadMaker
    )
  })
}

export default (api: MiddlewareAPI) => {
  return (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    const appState = api.getState()
    if (action.type === ActiveCharacterAction.SAVE_CHARACTER) {
      cleanAttributes(appState, api.dispatch)
      cleanGear(appState, api.dispatch)
    }
    next(action)
  }
}
