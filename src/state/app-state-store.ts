import { observable, reaction } from 'mobx'

export interface AppStateProps {
  appState?: AppStateStore
}

export type AppState = 'LOADING' | 'LOADED'

class AppStateStore {
  @observable currentState: AppState = 'LOADING'
}

export const appState = new AppStateStore()
