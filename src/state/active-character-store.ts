import { observable, reaction, action, ObservableMap, computed } from 'mobx'
import ApiService from '@services/api-service'
import {
  Character,
  Attribute,
  Attributes,
  OtherAttributes,
  Effect,
  PersistableCharacter,
  AttributeName,
  OtherAttributeName
} from '@models'

export interface ActiveCharacterProps {
  activeCharacter?: ActiveCharacterStore
}

/**
 * Class for maintaining the application store for a character being actively
 * viewed or modified by the user.  Static value of the storage key for the local
 * version of the active character is maintained here.  This store carries the side-effect
 * of reading from and storing an active character to the browser's local storage.
 */
export class ActiveCharacterStore {
  static ACTIVE_LOCAL_STORAGE_KEY = 'mighty_runner_character_active'
  static UPDATE_DELAY = 1000

  @observable character: Character | null = null
  @observable attributes: Attributes | null = null
  @observable otherAttributes: OtherAttributes | null = null
  @observable effects: Effect[] | null = null

  constructor () {
    reaction(() => this.character, this.characterReaction)
  }

  /**
   * Action to read an existing active character from local storage if one exists.
   */
  @action
  readFromLocalStorage () {
    let persistableCharacter: PersistableCharacter
    try {
      persistableCharacter = JSON.parse(localStorage.getItem(ActiveCharacterStore.ACTIVE_LOCAL_STORAGE_KEY)!)
      this.extractCharacterObjects(persistableCharacter)
    } catch (e) {
      return
    }
  }

  /**
   * Action which sets the active character from a persistable character object.
   * @param {PersistableCharacter} persistableharacter
   */
  @action
  setActiveCharacter (persistableCharacter: PersistableCharacter) {
    this.persistToLocalStorage(persistableCharacter)
    this.extractCharacterObjects(persistableCharacter)
  }

  /**
   * Action to update a character attribute by replacing it with a new object
   * @param {AttributeName} attributeName name of attribute to be replaced
   * @param {Attribute} attribute replacement attribute object
   */
  @action
  updateAttribute (attributeName: AttributeName, attribute: Attribute) {
    this.attributes![attributeName] = Object.assign({}, attribute)
    this.persistAll()
  }

  /**
   * Action to update a character otherAttribute by replacing it with a new object
   * @param {OtherAttributeName} otherAttributeName name of otherAttribute object to be replaced
   * @param {Attribute} otherAttribute replacement attribute object
   */
  @action
  updateOtherAttribute (otherAttributeName: OtherAttributeName, otherAttribute: Attribute) {
    this.otherAttributes![otherAttributeName] = Object.assign({}, otherAttribute)
    this.persistAll()
  }

  /**
   * Action to update an existing effect on a character by replacing it with a new object
   * @param {Effect} updatedEffect effect with is to replace an existing effect
   */
  @action
  updateEffect (updatedEffect: Effect) {
    const index = this.effects!.findIndex(effect => effect.id === updatedEffect.id)
    // TODO Handle index not found
    const effects = this.effects!.concat()
    effects[index] = updatedEffect
    this.effects = effects
    this.persistAll()
  }
  /**
   * Toggles the state of an existing effect by replacing the effect with a new object
   * whose active state is reversed
   * @param {string} effectId ID string of effect to be toggled
   */
  @action
  toggleEffect (effectId: string) {
    const updated = Object.assign({}, this.effects!.find(effect => effect.id === effectId))
    // TODO Handle index not found
    updated.active = !updated.active
    this.updateEffect(updated)
  }

  /**
   * Adds an effect to the character by replacing the existing array of effects with a new
   * one including the added effect.
   * @param {Effect} effect Effect to be added to the effects array
   */
  @action
  addEffect (effect: Effect) {
    this.effects = this.effects!.concat([ effect ])
    this.persistAll()
  }

  private characterReaction = (): void => {
    if (!this.character) { return }
    this.persistAll()
  }

  private persistAll (): void {
    const persistableCharacter = this.compileCharacterObjects()
    this.persistToLocalStorage(persistableCharacter)
    this.persistToApi(persistableCharacter)
  }

  private persistToLocalStorage (persistableCharacter: PersistableCharacter): void {
    localStorage.setItem(
      ActiveCharacterStore.ACTIVE_LOCAL_STORAGE_KEY,
      JSON.stringify(persistableCharacter)
    )
  }

  private persistToApi (persistableCharacter: PersistableCharacter) {
    ApiService.putCharacter(persistableCharacter.id, persistableCharacter)
      .then(() => { /* no-op */ }, () => { /* no-op */ })
  }

  private extractCharacterObjects (persistableharacter: PersistableCharacter): void {
    this.character = {
      userId: persistableharacter.userId,
      id: persistableharacter.id,
      name: persistableharacter.name
    }
    this.attributes = persistableharacter.attributes
    this.otherAttributes = persistableharacter.otherAttributes
    this.effects = persistableharacter.effects
  }

  private compileCharacterObjects (): PersistableCharacter {
    return {
      userId: this.character!.userId,
      id: this.character!.id,
      name: this.character!.name,
      attributes: this.attributes!,
      otherAttributes: this.otherAttributes!,
      effects: this.effects!
    }
  }
}

export const activeCharacter = new ActiveCharacterStore()
