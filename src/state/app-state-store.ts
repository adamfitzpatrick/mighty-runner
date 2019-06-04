import { observable, reaction } from 'mobx'

export interface AppStateProps {
  appState?: AppStateStore
}

export enum AppState {
  LOADING,
  LOADING_COMPLETE,
  LOADING_ANIMATION_COMPLETE
}

class AppStateStore {
  @observable currentState: AppState = AppState.LOADING_COMPLETE
}

export const appState = new AppStateStore()
