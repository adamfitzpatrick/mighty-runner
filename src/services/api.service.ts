import { CharacterModel } from '@assets/models'

export interface ApiServiceResponse {
  status: number,
  statusText: string
}

class ApiService {
  static TOKEN_STORAGE_ITEM_NAME: string = 'mighty_runner_api_access_token'
  static HOST: string = 'http://localhost:3001'
  public token: string
  public headers: Headers

  constructor (token?: string) {
    if (token) { localStorage.setItem(ApiService.TOKEN_STORAGE_ITEM_NAME, token) }
    this.token = localStorage.getItem(ApiService.TOKEN_STORAGE_ITEM_NAME)
    if (this.token) { this.headers = new Headers({ Authorization: `Bearer ${this.token}`}) }
  }

  getCharacterList = async (): Promise<CharacterModel[]> => {
    if (!this.token) {
      return Promise.reject('API access token is missing or incorrect')
    }
    return fetch(ApiService.HOST, { headers: this.headers }).then(response => {
      if (response.status < 400) { return response.json() }
      return Promise.reject(response)
    })
  }
}

export default ApiService
