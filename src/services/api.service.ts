import { CharacterModel } from '@assets/models'

interface TypedResponse<T> extends Response {
  json: () => Promise<T>
}

class ApiService {
  static TOKEN_STORAGE_ITEM_NAME: string = 'mighty_runner_api_access_token'
  static CHARACTER_STORAGE_ITEM_NAME: string = 'mighty_runner_characters_local'
  static HOST: string = `${window.location.protocol}//${window.location.hostname}:3001`
  public token: string
  public headers: Headers

  constructor (token?: string) {
    if (token) { localStorage.setItem(ApiService.TOKEN_STORAGE_ITEM_NAME, token) }
    this.token = localStorage.getItem(ApiService.TOKEN_STORAGE_ITEM_NAME)
    if (this.token) { this.headers = new Headers({ Authorization: `Bearer ${this.token}`}) }
  }

  localStoreCharacters (characters: CharacterModel[]) {
    localStorage.setItem(ApiService.CHARACTER_STORAGE_ITEM_NAME, JSON.stringify(characters))
  }

  getCharacterList = async (): Promise<CharacterModel[]> => {
    if (!this.token) {
      return Promise.reject('API access token is missing or incorrect')
    }
    return fetch(ApiService.HOST, { headers: this.headers }).then((response: TypedResponse<CharacterModel[]>)  => {
      if (response.status < 400) {
        return response.json()
      }
      return Promise.reject(response)
    }).then(characters => {
      this.localStoreCharacters(characters)
      return characters
    })
  }
}

export default ApiService
