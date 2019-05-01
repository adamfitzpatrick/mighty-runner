import { observable, reaction, computed } from 'mobx'

export interface DetailViewProps {
  detailView?: DetailViewStore
}

interface ExpansionState {
  [characterId: string]: boolean[]
}

class DetailViewStore {
  static EXPANDED_LOCAL_STORE_KEY = 'mighty_runner_detail_view_expansion_state'

  @observable expansionState: ExpansionState = {}

  constructor () {
    reaction(
      () => this.expansionState,
      this.setExpansionState
    )
    this.retrieveView()
  }

  @computed get activeExpanded (): boolean[] {
    return this.expansionState[this.getCharacterId()]
  }

  set activeExpanded (value: boolean[]) {
    this.expansionState[this.getCharacterId()] = value
    this.setExpansionState()
  }

  private getCharacterId () {
    const pathElements = window.location.pathname.split('/')
    return pathElements[pathElements.length - 1]
  }

  private retrieveView = () => {
    try {
      this.expansionState = JSON.parse(localStorage.getItem(DetailViewStore.EXPANDED_LOCAL_STORE_KEY) || '{}')
    } catch (e) {
      this.expansionState = {}
    }
  }

  private setExpansionState = () => {
    localStorage.setItem(DetailViewStore.EXPANDED_LOCAL_STORE_KEY, JSON.stringify(this.expansionState))
  }
}

export const detailView = new DetailViewStore()
