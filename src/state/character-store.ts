import { observable, reaction, action } from 'mobx'
import ApiService from '@services/api-service'
import { Character, Attribute } from '@models'

export interface CharacterProps {
  character?: CharacterStore
}

/**
 * Class for maintaining the application store for a character being actively
 * viewed or modified by the user.  Static value of the storage key for the local
 * version of the active character is maintained here.  This store carries the side-effect
 * of reading from and storing an active character to the browser's local storage.
 */
class CharacterStore {
  static ACTIVE_LOCAL_STORAGE_KEY = 'mighty_runner_character_active'
  static UPDATE_DELAY = 1000

  @observable active: Character | null = null

  constructor () {
    reaction(
      () => this.active,
      this.setActiveCharacter
    )
    this.retrieveLocalActiveCharacter()
  }

  /**
   * Toggles the active state of the specified effect for the active character.
   * @param {string} effectId The string UUID for the desired effect
   */
  @action
  toggleEffect (effectId: string) {
    let effect = this.active!.effects.find(a => a.id === effectId)!
    const effectIndex = this.active!.effects.indexOf(effect)
    effect = { ...effect }
    effect.active = !effect.active
    const active = new Character(this.active!)
    active.effects[effectIndex] = effect
    this.active = active
  }

  @action
  updateAttribute (attributePath: string[], attribute: Attribute) {
    attributePath = [ ...attributePath ]
    const active = new Character(this.active!)
    Character.setValue(active, attributePath, attribute)
    this.active = active
  }

  /**
   * Leverages the application's built-in API request service to persist the in-memory
   * active character definition to a backend storage service.
   */
  persistActive () {
    if (this.active) {
      return ApiService.putCharacter(this.active.id, this.active)
    }
  }

  /**
   * Retrieves the local storage definition of the active character and
   * sets the in-memory value.
   */
  private retrieveLocalActiveCharacter = () => {
    try {
      this.active = new Character(JSON.parse(localStorage.getItem(CharacterStore.ACTIVE_LOCAL_STORAGE_KEY)!))
    } catch (e) {
      this.active = null
    }
  }

  /**
   * Stores the in-memory active character definition to browser local storage.
   */
  private setActiveCharacter = () => {
    localStorage.setItem(CharacterStore.ACTIVE_LOCAL_STORAGE_KEY, JSON.stringify(this.active))
  }
}

export const character = new CharacterStore()
