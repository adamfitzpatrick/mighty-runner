import { Character, PersistableCharacter } from '@models'

declare var API_HOST: string

interface AcceptedMessage {
  message: string
}

interface TypedResponse<T> extends Response {
  json: () => Promise<T>
}

class CustomError extends Error {
  /* istanbul ignore next */
  constructor (message: string) {
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

function getAuthHeader () {
  const token = getAndValidateToken()
  return new Headers({ Authorization: `Bearer ${token}` })
}

function handleResponse<T> (response: TypedResponse<T>) {
  if (response.status === 403) {
    throw new Error()
  }
  if (response.status < 400) {
    return response.json()
  }
  return Promise.reject(response)
}

const TOKEN_LOCAL_STORAGE_KEY = 'mighty_runner_api_access_token'
const URL = `${API_HOST}/character`

const getCharacterList = async (): Promise<PersistableCharacter[]> => {
  const headers = getAuthHeader()
  return fetch(ApiService.URL, { headers })
    .then(response => handleResponse<PersistableCharacter[]>(response))
}

const getCharacter = async (characterId: string): Promise<PersistableCharacter> => {
  const headers = getAuthHeader()
  return fetch(`${ApiService.URL}/${characterId}`, { headers })
    .then(response => handleResponse<PersistableCharacter>(response))
}

const putCharacter = async (characterId: string, character: PersistableCharacter): Promise<AcceptedMessage> => {
  const headers = getAuthHeader()
  const options = {
    headers,
    body: JSON.stringify(character),
    method: 'PUT'
  }
  return fetch(`${ApiService.URL}/${characterId}`, options)
    .then(response => handleResponse<AcceptedMessage>(response))
}

const ApiService = {
  TOKEN_LOCAL_STORAGE_KEY,
  URL,
  getCharacterList,
  getCharacter,
  putCharacter
}

export default ApiService
