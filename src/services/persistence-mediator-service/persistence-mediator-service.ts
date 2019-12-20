import { Character } from '@models'
import * as RemoteApiService from '@services/remote-api-service'
import * as LocalApiService from '@services/local-api-service'

export interface PersistenceError {
  status: number
  fallback?: Character | Character[] | null
}

function findNewCharacters (locals: LocalApiService.CharactersMap, existing: string[]): Character[] {
  return Object.keys(locals)
    .filter(key => existing.indexOf(key) === -1)
    .map(key => locals[key])
}

function selectCharacter (remote: Character, local: Character | null): Character {
  return local && local.updated > remote.updated ? local : remote
}

function mediateLists (remotes: Character[], locals: LocalApiService.CharactersMap): Character[] {
  const existingLocals: string[] = []
  const updatedRemotes = remotes.map(char => {
    const local = locals[char.id]
    if (local) { existingLocals.push(char.id) }
    return selectCharacter(char, local)
  })
  return updatedRemotes.concat(findNewCharacters(locals, existingLocals))
}

function getLocalsArray (locals: LocalApiService.CharactersMap): Character[] {
  return Object.keys(locals).map(key => locals[key])
}

function handleError (err: any, fallback?: Character | Character[] | null) {
  return {
    status: err.status,
    fallback
  }
}

export const getCharacterList = async (): Promise<Character[] | PersistenceError> => {
  const locals = LocalApiService.getCharacterList()
  try {
    const remote = await RemoteApiService.getCharacterList()
    return mediateLists(remote, locals)
  } catch (err) {
    return handleError(err, getLocalsArray(locals))
  }
}

export const getCharacter = async (id: string): Promise<Character | PersistenceError> => {
  const local = LocalApiService.getCharacter(id)
  try {
    const remote = await RemoteApiService.getCharacter(id)
    return selectCharacter(remote, local)
  } catch (err) {
    return handleError(err, local)
  }
}

export const putCharacter = async (character: Character): Promise<RemoteApiService.AcceptedMessage | PersistenceError> => {
  LocalApiService.putCharacter(character.id, character)
  try {
    return await RemoteApiService.putCharacter(character.id, character)
  } catch (err) {
    return handleError(err)
  }
}
