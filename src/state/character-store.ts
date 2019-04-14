import { observable, reaction } from 'mobx'
import { CharacterModel } from '@assets/models'

export interface CharacterProps {
  character?: CharacterStore
}

class CharacterStore {
  static LIST_LOCAL_STORAGE_KEY = 'mighty_runner_character_list'
  static ACTIVE_LOCAL_STORAGE_KEY = 'mighty_runner_character_active'

  @observable list: CharacterModel[] | null = []
  @observable active: CharacterModel | null

  constructor () {
    reaction(
      () => this.list,
      this.setCharacterList
    )
    reaction(
      () => this.active,
      this.setActiveCharacter
    )
    this.retrieveLocalList()
    this.retrieveLocalActiveCharacter()
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

  private retrieveLocalActiveCharacter = () => {
    try {
      this.active = JSON.parse(localStorage.getItem(CharacterStore.ACTIVE_LOCAL_STORAGE_KEY) as string)
    } catch (e) {
      this.active = null
    }
  }

  private setActiveCharacter = () => {
    localStorage.setItem(CharacterStore.ACTIVE_LOCAL_STORAGE_KEY, JSON.stringify(this.active))
  }
}

export const character = new CharacterStore()
