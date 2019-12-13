import { Character } from '@models'

declare var API_HOST: string

export interface AcceptedMessage {
  message: string
}

interface TypedResponse<T> extends Response {
  json: () => Promise<T>
}

function getAndValidateToken () {
  const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)
  if (!token) {
    throw new Error('API access token is missing')
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

export const TOKEN_LOCAL_STORAGE_KEY = 'mighty_runner_api_access_token'
export const URL = `${API_HOST}/character`

export const getCharacterList = async (): Promise<Character[]> => {
  const headers = getAuthHeader()
  return fetch(URL, { headers })
    .then(response => handleResponse<Character[]>(response))
}

export const getCharacter = async (characterId: string): Promise<Character> => {
  const headers = getAuthHeader()
  return fetch(`${URL}/${characterId}`, { headers })
    .then(response => handleResponse<Character>(response))
}

export const putCharacter = async (characterId: string, character: Character): Promise<AcceptedMessage> => {
  const headers = getAuthHeader()
  const options = {
    headers,
    body: JSON.stringify(character),
    method: 'PUT'
  }
  return fetch(`${URL}/${characterId}`, options)
    .then(response => handleResponse<AcceptedMessage>(response))
}
