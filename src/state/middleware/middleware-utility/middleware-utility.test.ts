import {
  CharacterIdentifier,
  PersonalData,
  Attributes,
  SpecialAttributes,
  GearItem,
  Effect,
  Character
} from '@models'
import { Dispatch, AnyAction } from 'redux'
import { assembleCharacter, flattenCharacter, unsetCharacter } from './middleware-utility'
import {
  ActiveCharacterAction,
  PersonalDataAction,
  AttributesAction,
  GearAction,
  EffectsAction
} from '@state/actions'

describe('middleware utility', () => {
  let activeCharacter: CharacterIdentifier
  let personalData: PersonalData
  let attributes: Attributes
  let specialAttributes: SpecialAttributes
  let gear: GearItem[]
  let effects: Effect[]
  let character: Character
  let dispatchSpy: Dispatch<AnyAction>

  beforeEach(() => {
    activeCharacter = { id: '1', userId: 'u' }
    personalData = {} as PersonalData
    attributes = {} as Attributes
    specialAttributes = {} as SpecialAttributes
    gear = [] as GearItem[]
    effects = [] as Effect[]
    character = { ...activeCharacter, personalData, attributes, specialAttributes, gear, effects }
    dispatchSpy = jest.fn()
  })

  describe('assembleCharacter', () => {
    test('should assemble elements from the application state representing the active character', () => {
      const appState = {
        characters: [ character ],
        activeCharacter,
        ...character,
        apiError: false
      }
      expect(assembleCharacter(appState)).toEqual(character)
    })
  })

  describe('flattenCharacter', () => {
    test('should dispatch component objects of the provided character to populate the application state', () => {
      flattenCharacter(character, dispatchSpy)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: ActiveCharacterAction.SET_ACTIVE_CHARACTER,
        payload: activeCharacter
      })
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: PersonalDataAction.SET_PERSONAL_DATA,
        payload: personalData
      })
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: AttributesAction.SET_ATTRIBUTES,
        payload: attributes
      })
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: GearAction.SET_GEAR,
        payload: gear
      })
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: EffectsAction.SET_EFFECTS,
        payload: effects
      })
    })
  })

  describe('unsetActiveCharacter', () => {
    test('should dispatch null for all component objects of Character type', () => {
      unsetCharacter(dispatchSpy)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: ActiveCharacterAction.SET_ACTIVE_CHARACTER,
        payload: null
      })
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: PersonalDataAction.SET_PERSONAL_DATA,
        payload: null
      })
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: AttributesAction.SET_ATTRIBUTES,
        payload: null
      })
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: GearAction.SET_GEAR,
        payload: null
      })
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: EffectsAction.SET_EFFECTS,
        payload: null
      })
    })
  })
})
