import { observable, reaction } from 'mobx'
import ApiService from '@services/api-service';

export interface TokenProps {
  token?: TokenStore
}

class TokenStore {
  static LOCAL_STORAGE_KEY = ApiService.TOKEN_LOCAL_STORAGE_KEY

  @observable token: string

  constructor () {
    reaction(
      () => this.token,
      this.setToken
    )
    this.retrieveLocalToken()
  }

  private retrieveLocalToken = () => {
    try {
      this.token = localStorage.getItem(TokenStore.LOCAL_STORAGE_KEY)
    } catch (e) {
      this.token = null
    }
  }

  private setToken = () => {
    localStorage.setItem(TokenStore.LOCAL_STORAGE_KEY, this.token)
  }
}

export const token = new TokenStore()
