import { MiddlewareAPI, Dispatch, AnyAction } from 'redux'
import { assembleCharacter, flattenCharacter } from '../middleware-utility'
import { CharactersAction, ActiveCharacterAction, Action } from '@state/actions'
import { Character, CharacterIdentifier } from '@models'
import { unsetCharacter } from '../middleware-utility/middleware-utility'
import { AppState } from '@state/default-state'

const LOCALSTORAGE_NAMESPACE = 'mighty_runner'
const CHARACTERS_ITEM = `${LOCALSTORAGE_NAMESPACE}_characters`
const ACTIVE_CHARACTER_ITEM = `${LOCALSTORAGE_NAMESPACE}_active_character`

type ActionsForMiddleware = CharactersAction | ActiveCharacterAction
type PayloadsForMiddleware = Character[] | Character | undefined

function loadLocalCharacterList (): Character[] {
  let characters
  try {
    characters = JSON.parse(localStorage.getItem(CHARACTERS_ITEM) || '[]')
  } catch (err) {
    characters = []
  }
  return characters
}

function loadCharacters (dispatch: Dispatch<AnyAction>): void {
  dispatch({ type: CharactersAction.SET_CHARACTERS, payload: loadLocalCharacterList() })
}

function setCharacters (characters: Character[]): void {
  localStorage.setItem(CHARACTERS_ITEM, JSON.stringify(characters))
}

function updateLocalCharacterList (updatedCharacter: Character) {
  const updatedCharacters = loadLocalCharacterList()
  const indexToUpdate = updatedCharacters.findIndex(character => character.id === updatedCharacter.id)
  updatedCharacters[indexToUpdate] = updatedCharacter
  setCharacters(updatedCharacters)
}

function saveCharacter (character: Character): void {
  localStorage.setItem(ACTIVE_CHARACTER_ITEM, JSON.stringify(character))
  updateLocalCharacterList(character)
}

function loadCharacter (dispatch: Dispatch<AnyAction>, existingActive: CharacterIdentifier | null): void {
  let character: Character | null
  try {
    character = JSON.parse(localStorage.getItem(ACTIVE_CHARACTER_ITEM)!)
  } catch (err) {
    character = null
  }
  if (
    character &&
    (!existingActive || existingActive.updated < character.updated)
  ) {
    flattenCharacter(character, dispatch)
  } else if (!character) {
    unsetCharacter(dispatch)
  }
}

export default (api: MiddlewareAPI<Dispatch<AnyAction>, AppState>) => {
  return (next: Dispatch<AnyAction>) => (action: Action<ActionsForMiddleware, PayloadsForMiddleware>) => {
    switch (action.type) {
      case CharactersAction.LOAD_CHARACTERS:
        loadCharacters(api.dispatch)
        break
      case CharactersAction.SET_CHARACTERS:
        setCharacters(action.payload as Character[])
        break
      case ActiveCharacterAction.SAVE_CHARACTER:
        const character = assembleCharacter(api.getState())
        saveCharacter(character)
        break
      case ActiveCharacterAction.LOAD_CHARACTER:
        loadCharacter(api.dispatch, api.getState().activeCharacter)
        break
    }
    next(action)
  }
}
