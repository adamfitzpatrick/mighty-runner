import { observable, computed, reaction } from 'mobx'
import ApiService from '@services/api-service'
import { Character } from '@models'

export interface CharactersProps {
  characters?: CharactersStore
}

/**
 * Class for management of all character data and state within the application.
 * Static values of storage keys for the user's character list are maintained here.
 * Additionally, this store provides the side effect of loading from and updating
 * the character list to the browser's local storage.
 */
class CharactersStore {
  static LIST_LOCAL_STORAGE_KEY = 'mighty_runner_character_list'
  static UPDATE_DELAY = 1000

  @observable list: Character[] | null = []

  /**
   * Note that the constructor creates a reactive worker to update the local
   * storage character list whenever the in-memory list is set or modified.
   */
  constructor () {
    reaction(
      () => this.list,
      this.setCharacterList
    )
    this.retrieveLocalList()
  }

  /**
   * Retrieves a character list from local storage if one is available.
   */
  private retrieveLocalList = () => {
    try {
      this.list = JSON.parse(localStorage.getItem(CharactersStore.LIST_LOCAL_STORAGE_KEY) as string)
    } catch (e) {
      this.list = null
    }
  }

  /**
   * Stores the in-memory character list to local storage.
   */
  private setCharacterList = () => {
    localStorage.setItem(CharactersStore.LIST_LOCAL_STORAGE_KEY, JSON.stringify(this.list))
  }
}

export const characters = new CharactersStore()
