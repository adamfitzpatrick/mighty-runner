import { ActiveCharacterAction, PersonalDataAction, AttributesAction, GearAction, EffectsAction } from '@state/actions'
import { Character } from '@models'
import { Dispatch, AnyAction } from 'redux'
import { AppState } from '@state/default-state'

export function assembleCharacter (state: AppState): Character {
  // TODO This data needs to come from the individual character element reducers
  const character = state.characters!.find(char => char.id === state.activeCharacter!.id)!
  return {
    ...state.activeCharacter!,
    personalData: state.personalData!,
    attributes: state.attributes!,
    specialAttributes: character.specialAttributes,
    gear: state.gear!,
    effects: state.effects!
  }
}

export function flattenCharacter (character: Character, dispatch: Dispatch<AnyAction>) {
  dispatch({
    type: ActiveCharacterAction.SET_ACTIVE_CHARACTER,
    payload: { userId: character.userId, id: character.id }
  })
  dispatch({
    type: PersonalDataAction.SET_PERSONAL_DATA,
    payload: character.personalData
  })
  dispatch({
    type: AttributesAction.SET_ATTRIBUTES,
    payload: character.attributes
  })
  dispatch({
    type: GearAction.SET_GEAR,
    payload: character.gear
  })
  dispatch({
    type: EffectsAction.SET_EFFECTS,
    payload: character.effects
  })
}

export function unsetCharacter (dispatch: Dispatch<AnyAction>) {
  dispatch({
    type: ActiveCharacterAction.SET_ACTIVE_CHARACTER,
    payload: null
  })
  dispatch({
    type: PersonalDataAction.SET_PERSONAL_DATA,
    payload: null
  })
  dispatch({
    type: AttributesAction.SET_ATTRIBUTES,
    payload: null
  })
  dispatch({
    type: GearAction.SET_GEAR,
    payload: null
  })
  dispatch({
    type: EffectsAction.SET_EFFECTS,
    payload: null
  })
}
