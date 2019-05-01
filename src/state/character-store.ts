import { observable, computed, reaction } from 'mobx'
import { CharacterModel } from '@assets/models'
import ApiService from '@services/api-service'

export interface CharacterProps {
  character?: CharacterStore
}

class CharacterStore {
  static LIST_LOCAL_STORAGE_KEY = 'mighty_runner_character_list'
  static ACTIVE_LOCAL_STORAGE_KEY = 'mighty_runner_character_active'
  static UPDATE_DELAY = 1000

  @observable list: CharacterModel[] | null = []

  constructor () {
    reaction(
      () => this.list,
      this.setCharacterList
    )
    this.retrieveLocalList()
  }

  @computed get active (): CharacterModel | undefined {
    return this.list!.find(character => character.id === this.getCharacterId())
  }

  set active (updated: CharacterModel | undefined) {
    const index = this.list!.findIndex(character => character.id === this.getCharacterId())
    if (updated) {
      this.list![index] = updated
      this.setCharacterList()
    }
  }

  persistActive () {
    const active = this.active
    if (active) {
      return ApiService.putCharacter(active.id, active)
    }
  }

  private getCharacterId () {
    const pathElements = window.location.pathname.split('/')
    return pathElements[pathElements.length - 1]
  }

  private retrieveLocalList = () => {
    try {
      this.list = JSON.parse(localStorage.getItem(CharacterStore.LIST_LOCAL_STORAGE_KEY) as string)
    } catch (e) {
      this.list = null
    }
  }

  private setCharacterList = () => {
    localStorage.setItem(CharacterStore.LIST_LOCAL_STORAGE_KEY, JSON.stringify(this.list))
  }
}

export const character = new CharacterStore()
