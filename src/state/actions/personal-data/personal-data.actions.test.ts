import * as personalDataActions from './personal-data.actions'
import { AnyAction, Dispatch } from 'redux'
import { PersonalData } from '@models'

describe('personal data actions', () => {
  let dispatchSpy: Dispatch<AnyAction>

  beforeEach(() => {
    dispatchSpy = jest.fn()
  })

  describe('setPersonalDataCreator', () => {
    test('should return a function to dispatch the SET_PERSONAL_DATA action', () => {
      personalDataActions.setPersonalDataCreator(dispatchSpy)({} as PersonalData)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: personalDataActions.PersonalDataAction.SET_PERSONAL_DATA,
        payload: {}
      })
    })
  })
})
