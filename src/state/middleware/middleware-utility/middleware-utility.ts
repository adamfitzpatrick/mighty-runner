import { ActiveCharacterAction, PersonalDataAction, AttributesAction, GearAction, EffectsAction, Action, PicAction } from '@state/actions'
import { Character, CharacterIdentifier } from '@models'
import { Dispatch, AnyAction } from 'redux'
import { AppState } from '@state/default-state'

export function assembleCharacter (state: AppState): Character {
  // TODO This data needs to come from the individual character element reducers
  const character = state.characters!.find(char => char.id === state.activeCharacter!.id)!
  return {
    ...state.activeCharacter!,
    pic: state.pic!,
    personalData: state.personalData!,
    attributes: state.attributes!,
    specialAttributes: character.specialAttributes,
    gear: state.gear!,
    effects: state.effects!
  }
}

export function flattenCharacter (character: Character, dispatch: Dispatch<AnyAction>) {
  const activeCharacterDispatcher = dispatch as Dispatch<Action<ActiveCharacterAction, CharacterIdentifier>>
  activeCharacterDispatcher({
    type: ActiveCharacterAction.SET_ACTIVE_CHARACTER,
    payload: {
      userId: character.userId,
      id: character.id,
      created: character.created,
      updated: character.updated,
      favorite: character.favorite
    }
  })
  dispatch({
    type: PicAction.SET_PIC,
    payload: character.pic
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

export function conditionallySetCharacter (
  character: Character,
  dispatch: Dispatch<AnyAction>,
  existingCharacter: CharacterIdentifier | null
) {
  if (!existingCharacter || character.updated > existingCharacter.updated) {
    flattenCharacter(character, dispatch)
  }
}
