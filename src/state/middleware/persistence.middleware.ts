import { MiddlewareAPI, Dispatch, AnyAction } from 'redux'
import ApiService from '@services/api-service'
import { Action, CharactersAction, ActiveCharacterAction, PersonalDataAction, AttributesAction } from '../actions'
import { Character } from '@models'
import { AppState } from '@state/default-state'
import { EffectsAction } from '@state/actions/effects.actions'
import { GearAction } from '@state/actions/gear.actions'

function assembleCharacter (state: AppState): Character {
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

function flattenCharacter (character: Character, dispatch: Dispatch<AnyAction>) {
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
    type: EffectsAction.SET_EFFECTS,
    payload: character.effects
  })
  dispatch({
    type: GearAction.SET_GEAR,
    payload: character.gear
  })
}

function loadCharacters () {
  return (dispatch: Dispatch<Action<CharactersAction, Character[]>>) => {
    ApiService.getCharacterList()
      .then(characters => {
        dispatch({
          type: CharactersAction.SET_CHARACTERS,
          payload: characters
        })
      }, err => {
        console.log(err)
      })
  }
}

function loadCharacter (characterId: string) {
  return (dispatch: Dispatch<AnyAction>) => {
    ApiService.getCharacter(characterId)
      .then(character => {
        flattenCharacter(character, dispatch)
      }, err => {
        console.log(err)
      })
  }
}

function persistActiveCharacter (character: Character) {
  return (dispatch: Dispatch<AnyAction>) => {
    ApiService.putCharacter(character.id, character)
      .then(() => {
        flattenCharacter(character, dispatch)
      }, err => {
        console.log(err)
      })
  }
}

export default (api: MiddlewareAPI<Dispatch<AnyAction>>) => {
  return (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    switch (action.type) {
      case ActiveCharacterAction.SAVE_CHARACTER:
        const character = assembleCharacter(api.getState())
        persistActiveCharacter(character)(api.dispatch)
        break
      case ActiveCharacterAction.LOAD_CHARACTER:
        loadCharacter((action as Action<ActiveCharacterAction, string>).payload)(api.dispatch)
        break
      case CharactersAction.LOAD_CHARACTERS:
        loadCharacters()(api.dispatch)
        break
    }
    next(action)
  }
}
