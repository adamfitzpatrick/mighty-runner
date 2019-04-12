import { CharacterModel } from '@assets/models'

interface TypedResponse<T> extends Response {
  json: () => Promise<T>
}

class CustomError extends Error {
  constructor (message?: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
export class MissingTokenError extends CustomError {}
export class UnauthorizedError extends CustomError {}

function getAndValidateToken () {
  const token = localStorage.getItem(ApiService.TOKEN_LOCAL_STORAGE_KEY)
  if (!token) {
    throw new MissingTokenError('API access token is missing')
  }
  return token
}

export default class ApiService {
  static TOKEN_LOCAL_STORAGE_KEY: string = 'mighty_runner_api_access_token'
  static HOST: string = `${window.location.protocol}//${window.location.hostname}:3001`

  static getCharacterList = async (): Promise<CharacterModel[]> => {
    const token = getAndValidateToken()
    const headers = new Headers({ Authorization: `Bearer ${token}`})
    return fetch(ApiService.HOST, { headers: headers }).then((response: TypedResponse<CharacterModel[]>)  => {
      if (response.status === 401) {
        throw new UnauthorizedError()
      }
      if (response.status < 400) {
        return response.json()
      }
      return Promise.reject(response)
    }).then(characters => {
      return characters
    })
  }
}
