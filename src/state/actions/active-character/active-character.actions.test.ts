import * as activeCharacterActions from './active-character.actions'
import { AnyAction, Dispatch } from 'redux'

describe('active-character actions', () => {
  let dispatchSpy: Dispatch<AnyAction>

  beforeEach(() => {
    dispatchSpy = jest.fn()
  })

  describe('setActiveCharacterCreator', () => {
    test('should return a function to dispatch the SET_ACTIVE_CHARACTER action', () => {
      let payload = {
        id: '1',
        userId: '1',
        created: 1,
        updated: 1,
        favorite: false
      }
      activeCharacterActions.setActiveCharacterCreator(dispatchSpy)(payload)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: activeCharacterActions.ActiveCharacterAction.SET_ACTIVE_CHARACTER,
        payload
      })
    })
  })

  describe('saveActiveCharacterCreator', () => {
    test('should return a function to dispatch the SAVE_ACTIVE_CHARACTER action', () => {
      activeCharacterActions.saveCharacterCreator(dispatchSpy)()
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: activeCharacterActions.ActiveCharacterAction.SAVE_CHARACTER
      })
    })
  })

  describe('loadActiveCharacterCreator', () => {
    test('should return a function to dispatch the LOAD_ACTIVE_CHARACTER action', () => {
      activeCharacterActions.loadCharacterCreator(dispatchSpy)('1')
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: activeCharacterActions.ActiveCharacterAction.LOAD_CHARACTER,
        payload: '1'
      })
    })
  })
})

