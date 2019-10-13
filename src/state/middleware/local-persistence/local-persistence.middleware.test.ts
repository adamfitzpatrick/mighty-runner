import { Dispatch, AnyAction, MiddlewareAPI } from 'redux'
import sut from './local-persistence.middleware'
import { CharactersAction, ActiveCharacterAction, PersonalDataAction, AttributesAction, GearAction, EffectsAction } from '@state/actions'
import { AppState } from '@state/default-state'
import { PersonalData, Attributes, GearItem, Effect, Character, SpecialAttributes } from '@models'

type TestDispatch = Dispatch<AnyAction>
type TestApi = MiddlewareAPI<TestDispatch>

describe('local-persistence middleware', () => {
  let character: Character
  let appState: AppState
  let dispatchSpy: TestDispatch
  let api: TestApi
  let next: TestDispatch
  let middleware: (action: AnyAction) => void

  beforeEach(() => {
    character = {
      id: '1',
      userId: 'u',
      personalData: {} as PersonalData,
      attributes: {} as Attributes,
      specialAttributes: {} as SpecialAttributes,
      gear: [] as GearItem[],
      effects: [] as Effect[]
    }
    appState = {
      characters: [ character ],
      activeCharacter: { id: '1', userId: 'u' },
      personalData: {} as PersonalData,
      attributes: {} as Attributes,
      specialAttributes: {} as SpecialAttributes,
      gear: [] as GearItem[],
      effects: [] as Effect[]
    } as AppState
    dispatchSpy = jest.fn() as TestDispatch
    api = {
      getState: () => appState,
      dispatch: dispatchSpy
    }
    next = jest.fn() as Dispatch<AnyAction>
    localStorage.clear()
    middleware = sut(api)(next)
  })

  describe('LOAD_CHARACTERS', () => {
    test('should load characters from local storage', () => {
      let action = { type: CharactersAction.LOAD_CHARACTERS }
      localStorage.setItem('mighty_runner_characters', JSON.stringify([ character ]))
      middleware(action)
      expect(next).toHaveBeenCalledWith(action)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: CharactersAction.SET_CHARACTERS,
        payload: [ character ]
      })
    })

    test('should return an empty array if local storage container invalid JSON', () => {
      let action = { type: CharactersAction.LOAD_CHARACTERS }
      localStorage.setItem('mighty_runner_characters', 'badjson')
      middleware(action)
      expect(next).toHaveBeenCalledWith(action)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: CharactersAction.SET_CHARACTERS,
        payload: []
      })
    })

    test('should return an empty array if nothing is stored in local storage', () => {
      let action = { type: CharactersAction.LOAD_CHARACTERS }
      middleware(action)
      expect(next).toHaveBeenCalledWith(action)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: CharactersAction.SET_CHARACTERS,
        payload: []
      })
      expect(next).toHaveBeenCalledWith(action)
    })
  })

  describe('SET_CHARACTERS', () => {
    test('should store the provided character list in local storage', () => {
      let action = {
        type: CharactersAction.SET_CHARACTERS,
        payload: []
      }
      middleware(action)
      expect(next).toHaveBeenCalledWith(action)
      expect(localStorage.getItem('mighty_runner_characters')).toEqual('[]')
    })
  })

  describe('SAVE_CHARACTER', () => {
    test('should store the provided character in local storage', () => {
      let action = { type: ActiveCharacterAction.SAVE_CHARACTER }
      middleware(action)
      expect(next).toHaveBeenCalledWith(action)
      expect(localStorage.getItem('mighty_runner_active_character'))
        .toEqual(JSON.stringify(character))
    })

    test('should update the character entry in the characters list', () => {
      appState.personalData!.name = 'changed'
      let action = { type: ActiveCharacterAction.SAVE_CHARACTER }
      localStorage.setItem('mighty_runner_characters', JSON.stringify([ character ]))
      middleware(action)
      expect(next).toHaveBeenCalledWith(action)
      const updatedCharacters = JSON.parse(localStorage.getItem('mighty_runner_characters')!)
      expect(updatedCharacters[0].personalData.name).toBe('changed')
    })
  })

  describe('LOAD_CHARACTER', () => {
    test('should load the current active character in local storage', () => {
      let action = { type: ActiveCharacterAction.LOAD_CHARACTER }
      localStorage.setItem('mighty_runner_active_character', JSON.stringify(character))
      middleware(action)
      expect(next).toHaveBeenCalledWith(action)
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: ActiveCharacterAction.SET_ACTIVE_CHARACTER
      }))
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: PersonalDataAction.SET_PERSONAL_DATA
      }))
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: AttributesAction.SET_ATTRIBUTES
      }))
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: GearAction.SET_GEAR
      }))
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: EffectsAction.SET_EFFECTS
      }))
    })

    test('should return null if there is no active character in local storage', () => {
      let action = { type: ActiveCharacterAction.LOAD_CHARACTER }
      middleware(action)
      expect(next).toHaveBeenCalledWith(action)
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: ActiveCharacterAction.SET_ACTIVE_CHARACTER,
        payload: null
      }))
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: PersonalDataAction.SET_PERSONAL_DATA,
        payload: null
      }))
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: AttributesAction.SET_ATTRIBUTES,
        payload: null
      }))
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: GearAction.SET_GEAR,
        payload: null
      }))
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: EffectsAction.SET_EFFECTS,
        payload: null
      }))
    })

    test('should return null if the local storage returns invalid data', () => {
      let action = { type: ActiveCharacterAction.LOAD_CHARACTER }
      localStorage.setItem('mighty_runner_active_character', 'badjson')
      middleware(action)
      expect(next).toHaveBeenCalledWith(action)
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: ActiveCharacterAction.SET_ACTIVE_CHARACTER,
        payload: null
      }))
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: PersonalDataAction.SET_PERSONAL_DATA,
        payload: null
      }))
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: AttributesAction.SET_ATTRIBUTES,
        payload: null
      }))
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: GearAction.SET_GEAR,
        payload: null
      }))
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
        type: EffectsAction.SET_EFFECTS,
        payload: null
      }))
    })
  })
})
