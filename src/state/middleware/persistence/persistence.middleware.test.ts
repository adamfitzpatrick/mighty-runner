jest.mock('@services/remote-api-service', () => ({
  TOKEN_LOCAL_STORAGE_KEY: 'token-key',
  URL: 'url',
  getCharacterList: jest.fn(),
  getCharacter: jest.fn(),
  putCharacter: jest.fn()
}))
import * as RemoteApiService from '@services/remote-api-service'
import { flattenCharacter, assembleCharacter } from '@state/middleware/middleware-utility'
jest.mock('@state/middleware/middleware-utility')

import { Dispatch, AnyAction, MiddlewareAPI } from 'redux'

import sut from './persistence.middleware'
import { AppState } from '@state/default-state'
import { PersonalData, Attributes, GearItem, Effect, Character, SpecialAttributes, CharacterIdentifier, Pic } from '@models'
import { CharactersAction, ActiveCharacterAction, ApiErrorAction } from '@state/actions'

type TestDispatch = Dispatch<AnyAction>
type TestApi = MiddlewareAPI<TestDispatch>
interface ApiServiceMock {
  getCharacterList: jest.Mock<Promise<Character[]>>,
  getCharacter: jest.Mock<Promise<Character>>,
  putCharacter: jest.Mock<Promise<{ message: string }>>
}
type FlattenMock = jest.Mock<void>
type AssembleMock = jest.Mock<Character>

describe('persistence middleware', () => {
  let character: Character
  let appState: AppState
  let dispatchSpy: TestDispatch
  let api: TestApi
  let next: TestDispatch
  let apiServiceMock: ApiServiceMock
  let flattenMock: FlattenMock
  let assembleMock: AssembleMock
  let middleware: (action: AnyAction) => void

  beforeEach(() => {
    character = {
      id: '1',
      userId: 'u',
      created: 1,
      updated: 1,
      favorite: false,
      personalData: {} as PersonalData,
      attributes: {} as Attributes,
      specialAttributes: {} as SpecialAttributes,
      gear: [] as GearItem[],
      effects: [] as Effect[]
    } as Character
    appState = {
      characters: [ character ],
      activeCharacter: { id: '1', userId: 'u' } as CharacterIdentifier,
      pic: {} as Pic,
      personalData: {} as PersonalData,
      attributes: {} as Attributes,
      specialAttributes: {} as SpecialAttributes,
      gear: [] as GearItem[],
      effects: [] as Effect[],
      apiError: false
    } as AppState
    dispatchSpy = jest.fn() as TestDispatch
    api = {
      getState: () => appState,
      dispatch: dispatchSpy
    }
    next = jest.fn() as Dispatch<AnyAction>
    apiServiceMock = RemoteApiService as any as ApiServiceMock
    assembleMock = assembleCharacter as any as AssembleMock
    assembleMock.mockReturnValue(character)
    flattenMock = flattenCharacter as any as FlattenMock
    middleware = sut(api)(next)
  })

  describe('SAVE_CHARACTER', () => {
    let promise: Promise<{ message: string }>

    test('should call the api service to save the character', async () => {
      promise = new Promise((resolve, reject) => resolve())
      apiServiceMock.putCharacter.mockReturnValue(promise)
      const action = { type: ActiveCharacterAction.SAVE_CHARACTER }
      middleware(action)
      await promise.then(() => {
        expect(apiServiceMock.putCharacter).toHaveBeenCalledWith('1', character)
        expect(dispatchSpy).toHaveBeenCalledWith({ type: ApiErrorAction.SET_API_HEALTHY })
      })
    })

    test('should dispatch an error if the call to the api service fails', async () => {
      let promise = new Promise<{ message: string }>((resolve, reject) => reject())
      apiServiceMock.putCharacter.mockReturnValue(promise)
      const action = { type: ActiveCharacterAction.SAVE_CHARACTER }
      middleware(action)
      await promise.catch(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({ type: ApiErrorAction.SET_API_ERROR })
      })
    })
  })

  describe('LOAD_CHARACTER', () => {
    beforeEach(() => {
      delete appState.activeCharacter
    })

    test('should call the api service to load the character', async () => {
      let promise = new Promise<Character>(resolve => resolve(character))
      apiServiceMock.getCharacter.mockReturnValue(promise)
      const action = { type: ActiveCharacterAction.LOAD_CHARACTER, payload: '1' }
      middleware(action)
      expect(apiServiceMock.getCharacter).toHaveBeenCalledWith('1')
      await promise.then(() => {
        expect(flattenMock).toHaveBeenCalledWith(character, dispatchSpy)
        expect(dispatchSpy).toHaveBeenCalledWith({ type: ApiErrorAction.SET_API_HEALTHY })
      })
    })

    test('should dispatch an error if the call to the api service fails', async () => {
      let promise = new Promise<Character>((resolve, reject) => reject())
      apiServiceMock.getCharacter.mockReturnValue(promise)
      const action = { type: ActiveCharacterAction.LOAD_CHARACTER, payload: '1' }
      middleware(action)
      await promise.catch(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({ type: ApiErrorAction.SET_API_ERROR })
      })
    })

    describe('when there is an existing activeCharacter state', () => {
      test('should set activeCharacter if the activeCharacter state is older', async () => {
        appState.activeCharacter = { updated: 1 } as CharacterIdentifier
        const action = { type: ActiveCharacterAction.LOAD_CHARACTER, payload: '1' }
        character.updated = 2
        let promise = new Promise<Character>(resolve => resolve(character))
        apiServiceMock.getCharacter.mockReturnValue(promise)
        middleware(action)
        await promise.then(() => {
          expect(flattenMock).toHaveBeenCalledWith(character, dispatchSpy)
        })
      })

      test('should not set activeCharacter if the activeCharacter state is newer', async () => {
        appState.activeCharacter = { updated: 2 } as CharacterIdentifier
        const action = { type: ActiveCharacterAction.LOAD_CHARACTER, payload: '1' }
        character.updated = 1
        let promise = new Promise<Character>(resolve => resolve(character))
        apiServiceMock.getCharacter.mockReturnValue(promise)
        middleware(action)
        await promise.then(() => {
          expect(flattenMock).not.toHaveBeenCalledWith(character, dispatchSpy)
        })
      })
    })
  })

  describe('LOAD_CHARACTERS', () => {
    test('should call the api service to load a list of characters', async () => {
      let promise = new Promise<Character[]>(resolve => resolve([ character ]))
      apiServiceMock.getCharacterList.mockReturnValue(promise)
      const action = { type: CharactersAction.LOAD_CHARACTERS }
      middleware(action)
      expect(apiServiceMock.getCharacterList).toHaveBeenCalled()
      await promise.then(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: CharactersAction.SET_CHARACTERS,
          payload: [ character ]
        })
        expect(dispatchSpy).toHaveBeenCalledWith({ type: ApiErrorAction.SET_API_HEALTHY })
      })
    })

    test('should dispatch an error if the call to the api service fails', async () => {
      let promise = new Promise<Character[]>((resolve, reject) => reject())
      apiServiceMock.getCharacterList.mockReturnValue(promise)
      const action = { type: CharactersAction.LOAD_CHARACTERS }
      middleware(action)
      await promise.catch(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({ type: ApiErrorAction.SET_API_ERROR })
      })
    })
  })
})
