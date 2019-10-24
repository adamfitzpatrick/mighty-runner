import * as charactersActions from './characters.actions'
import { AnyAction, Dispatch } from 'redux'
import { Character } from '@models'

describe('characters actions', () => {
  let dispatchSpy: Dispatch<AnyAction>

  beforeEach(() => {
    dispatchSpy = jest.fn()
  })

  describe('setAttributesCreator', () => {
    test('should return a function to dispatch the LOAD_CHARACTERS action', () => {
      charactersActions.loadCharactersCreator(dispatchSpy)()
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: charactersActions.CharactersAction.LOAD_CHARACTERS
      })
    })
  })

  describe('updateAttributeCreator', () => {
    test('should return a function to dispatch the UPDATE_ATTRIBUTE action', () => {
      charactersActions.setCharactersCreator(dispatchSpy)([] as Character[])
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: charactersActions.CharactersAction.SET_CHARACTERS,
        payload: []
      })
    })
  })
})
