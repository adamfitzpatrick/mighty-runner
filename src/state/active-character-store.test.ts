import ApiService from '@services/api-service'
import { activeCharacter } from './active-character-store'
import {
  PersistableCharacter,
  Attribute,
  Attributes,
  OtherAttributes,
  Effect,
  Character
} from '@models'
import { toJS } from 'mobx'

jest.mock('../services/api-service')

describe('character store', () => {
  const lsNamespace = 'mighty_runner_character_active'
  let character: Character
  let attributes: Attributes
  let otherAttributes: OtherAttributes
  let effects: Effect[]
  let persistableCharacter: PersistableCharacter

  beforeEach(() => {
    (ApiService.putCharacter as jest.Mock).mockResolvedValue({ statusCode: 200, message: 'ok' })
    character = {
      userId: 'USERID',
      id: '1',
      name: 'Character'
    }
    attributes = {
      agility: { value: { initial: 1, chargen: 5 }, asTarget: [ 'attributes', 'agility' ] } as Attribute
    }
    otherAttributes = {
      essence: { value: { initial: 6 }, asTarget: [ 'otherAttributes', 'essence' ] } as Attribute
    }
    effects = [
      { name: 'Thing', target: [ 'attributes', 'agility' ], id: '1', active: false, value: 1 },
      { name: 'Other Thing', target: [ 'otherAttributes', 'essence', ], id: '2', active: false, value: 2 }
    ]
    persistableCharacter = {
      userId: character.userId,
      id: character.id,
      name: character.name,
      attributes,
      otherAttributes,
      effects
    }
    activeCharacter.character = null
    activeCharacter.attributes = null
    activeCharacter.otherAttributes = null
    activeCharacter.effects = null
    localStorage.clear()
  })

  describe('readFromLocalStorage action', () => {
    test('should not throw an error if there is no character definition in local storage', () => {
      activeCharacter.readFromLocalStorage()
      expect(activeCharacter.character).toBeNull()
    })

    test('should parse the persistable character from local storage into obeservable objects', () => {
      localStorage.setItem(lsNamespace, JSON.stringify(persistableCharacter))
      activeCharacter.readFromLocalStorage()
      expect(toJS(activeCharacter.character)).toEqual(character)
      expect(toJS(activeCharacter.attributes)).toEqual(attributes)
      expect(toJS(activeCharacter.otherAttributes)).toEqual(otherAttributes)
      expect(toJS(activeCharacter.effects)).toEqual(effects)
    })
  })

  describe('setActiveCharacter action', () => {
    test('should store the peristable character definition in local storage', () => {
      activeCharacter.setActiveCharacter(persistableCharacter)
      expect(JSON.parse(localStorage.getItem(lsNamespace)!)).toEqual(persistableCharacter)
    })

    test('should parse the persistable character definition into observable objects', () => {
      activeCharacter.setActiveCharacter(persistableCharacter)
      expect(toJS(activeCharacter.character)).toEqual(character)
      expect(toJS(activeCharacter.attributes)).toEqual(attributes)
      expect(toJS(activeCharacter.otherAttributes)).toEqual(otherAttributes)
      expect(toJS(activeCharacter.effects)).toEqual(effects)
    })
  })

  describe('character reaction', () => {
    test('should update the persistable character definition in local storage', () => {
      character.name = 'New Character'
      activeCharacter.character = character
      expect(JSON.parse(localStorage.getItem(lsNamespace)!).name).toEqual('New Character')
    })

    test('should call the API service to store the persistable character definition', () => {
      activeCharacter.character = character
      const toPersist = Object.assign(
        character,
        { attributes: null, otherAttributes: null, effects: null }
      )
      expect(ApiService.putCharacter).toHaveBeenCalledWith('1', toPersist)
    })
  })

  describe('updateAttribute action', () => {
    let agility: Attribute

    beforeEach(() => {
      activeCharacter.setActiveCharacter(persistableCharacter)
      agility = Object.assign({} as Attribute, attributes.agility)
      agility.value.initial = 25
      activeCharacter.updateAttribute('agility', agility)
    })

    test('should update the persistable character definition in local storage', () => {
      expect(
        JSON.parse(localStorage.getItem(lsNamespace)!).attributes.agility.value.initial
      ).toEqual(25)
    })

    test('should call the API service to store the persistable character definition', () => {
      const toPersist = Object.assign({}, persistableCharacter)
      toPersist.attributes.agility.value.initial = 25
      expect(ApiService.putCharacter).toHaveBeenCalledWith('1', toPersist)
    })
  })

  describe('updateOtherAttribute action', () => {
    let essence: Attribute

    beforeEach(() => {
      activeCharacter.setActiveCharacter(persistableCharacter)
      essence = Object.assign({} as Attribute, otherAttributes.essence)
      essence.value.initial = 25
      activeCharacter.updateOtherAttribute('essence', essence)
    })

    test('should update the persistable character definition in local storage', () => {
      const persisted = JSON.parse(localStorage.getItem(lsNamespace)!)
      expect(persisted.otherAttributes.essence.value.initial).toEqual(25)
    })

    test('should call the API service to store the persistable character definition', () => {
      const toPersist = Object.assign({}, persistableCharacter)
      toPersist.otherAttributes.essence.value.initial = 25
      expect(ApiService.putCharacter).toHaveBeenCalledWith('1', toPersist)
    })
  })

  describe('updateEffect action', () => {
    let effect: Effect

    beforeEach(() => {
      activeCharacter.setActiveCharacter(persistableCharacter)
      effect = Object.assign({}, effects[0])
      effect.value = 25
      activeCharacter.updateEffect(effect)
    })

    test('should update the persistable character definition in local storage', () => {
      expect(JSON.parse(localStorage.getItem(lsNamespace)!).effects[0]).toEqual(effect)
    })

    test('should call the API service to store the persistable character definition', () => {
      const toPersist = Object.assign({}, persistableCharacter)
      toPersist.effects[0].value = 25
      expect(ApiService.putCharacter).toHaveBeenCalledWith('1', toPersist)
    })
  })

  describe('toggleEffect action', () => {
    beforeEach(() => {
      activeCharacter.setActiveCharacter(persistableCharacter)
      activeCharacter.toggleEffect('1')
    })

    test('should toggle the state of the relevant effect and update the observable', () => {
      expect(activeCharacter.effects![0].active).toEqual(true)
    })

    test('should update the persistable character definition in local storage', () => {
      expect(JSON.parse(localStorage.getItem(lsNamespace)!).effects[0].active).toEqual(true)
    })

    test('should call the API service to store the persistable character definition', () => {
      const toPersist = Object.assign({}, persistableCharacter)
      toPersist.effects[0].active = true
      expect(ApiService.putCharacter).toHaveBeenCalledWith('1', toPersist)
    })
  })

  describe('addEffect action', () => {
    let effect: Effect

    beforeEach(() => {
      activeCharacter.setActiveCharacter(persistableCharacter)
      effect = {
        id: '2',
        active: true,
        value: 3
      } as Effect
      activeCharacter.addEffect(effect)
    })

    test('should add an effect and update the observable', () => {
      expect(activeCharacter.effects![2]).toEqual(effect)
    })

    test('should update the persistable character definition in local storage', () => {
      expect(JSON.parse(localStorage.getItem(lsNamespace)!).effects[2]).toEqual(effect)
    })

    test('should call the API service to store the persistable character definition', () => {
      persistableCharacter.effects[2] = effect
      expect(ApiService.putCharacter).toHaveBeenCalledWith('1', persistableCharacter)
    })
  })
})
