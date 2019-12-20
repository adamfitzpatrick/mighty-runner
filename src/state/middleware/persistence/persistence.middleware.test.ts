interface PersistenceMediatorServiceMock {
  getCharacterList: jest.Mock<Promise<Character[]>>,
  getCharacter: jest.Mock<Promise<Character>>,
  putCharacter: jest.Mock<Promise<AcceptedMessage | PersistenceError>>
}
jest.mock('@services/persistence-mediator-service', () => ({
  getCharacterList: jest.fn(),
  getCharacter: jest.fn(),
  putCharacter: jest.fn()
}))
const PersistenceMediatorService: PersistenceMediatorServiceMock =
  require('@services/persistence-mediator-service')
import { Dispatch, AnyAction, MiddlewareAPI } from 'redux'

type TestDispatch = Dispatch<AnyAction>
type TestApi = MiddlewareAPI<TestDispatch>

import sut from './persistence.middleware'
import { AppState } from '@state/default-state'
import {
  PersonalData,
  Attributes,
  GearItem,
  Effect,
  Character,
  SpecialAttributes,
  CharacterIdentifier,
  Pic
} from '@models'
import { ActiveCharacterAction, ApiErrorAction, CharactersAction } from '@state/actions'
import { AcceptedMessage } from '@services/remote-api-service'
import { PersistenceError } from '@services/persistence-mediator-service'

describe('persistence middleware', () => {
  let character: Character
  let appState: AppState
  let dispatchSpy: TestDispatch
  let api: TestApi
  let next: TestDispatch
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
    middleware = sut(api)(next)
  })

  describe('SAVE_CHARACTER', () => {
    test('should call the api service to save the character', async () => {
      let promise = Promise.resolve({ message: 'accepted' })
      PersistenceMediatorService.putCharacter.mockReturnValue(promise)
      const action = { type: ActiveCharacterAction.SAVE_CHARACTER }
      middleware(action)
      await promise.then(() => {
        expect(PersistenceMediatorService.putCharacter)
          .toHaveBeenCalledWith(expect.objectContaining({ id: '1' }))
        expect(dispatchSpy).toHaveBeenCalledWith({ type: ApiErrorAction.SET_API_HEALTHY })
        expect(dispatchSpy).toHaveBeenCalledWith({ type: CharactersAction.LOAD_CHARACTERS})
      })
    })

    test('should dispatch an error if the call to the api service fails', async () => {
      let promise = Promise.reject({ status: 500 })
      PersistenceMediatorService.putCharacter.mockReturnValue(promise)
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
      let promise = Promise.resolve(character)
      PersistenceMediatorService.getCharacter.mockReturnValue(promise)
      const action = { type: ActiveCharacterAction.LOAD_CHARACTER, payload: '1' }
      middleware(action)
      expect(PersistenceMediatorService.getCharacter).toHaveBeenCalledWith('1')
      await promise.then(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ActiveCharacterAction.SET_ACTIVE_CHARACTER,
          payload: expect.objectContaining({ id: '1' })
        })
        expect(dispatchSpy).toHaveBeenCalledWith({ type: ApiErrorAction.SET_API_HEALTHY })
      })
    })

    test('should dispatch an error if the call to the api service fails', async () => {
      let promise = Promise.reject({
        status: 500,
        fallback: character
      })
      PersistenceMediatorService.getCharacter.mockReturnValue(promise)
      const action = { type: ActiveCharacterAction.LOAD_CHARACTER, payload: '1' }
      middleware(action)
      await promise.catch(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ActiveCharacterAction.SET_ACTIVE_CHARACTER,
          payload: expect.objectContaining({ id: '1' })
        })
        expect(dispatchSpy).toHaveBeenCalledWith({ type: ApiErrorAction.SET_API_ERROR })
      })
    })
  })

  describe('LOAD_CHARACTERS', () => {
    test('should call the api service to load a list of characters', async () => {
      let promise = Promise.resolve([ character ])
      PersistenceMediatorService.getCharacterList.mockReturnValue(promise)
      const action = { type: CharactersAction.LOAD_CHARACTERS }
      middleware(action)
      expect(PersistenceMediatorService.getCharacterList).toHaveBeenCalled()
      await promise.then(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: CharactersAction.SET_CHARACTERS,
          payload: [ character ]
        })
        expect(dispatchSpy).toHaveBeenCalledWith({ type: ApiErrorAction.SET_API_HEALTHY })
      })
    })

    test('should dispatch an error if the call to the api service fails', async () => {
      let promise = Promise.reject({
        status: 500,
        fallback: [ character ]
      })
      PersistenceMediatorService.getCharacterList.mockReturnValue(promise)
      const action = { type: CharactersAction.LOAD_CHARACTERS }
      middleware(action)
      await promise.catch(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: CharactersAction.SET_CHARACTERS,
          payload: [ character ]
        })
        expect(dispatchSpy).toHaveBeenCalledWith({ type: ApiErrorAction.SET_API_ERROR })
      })
    })
  })
})
