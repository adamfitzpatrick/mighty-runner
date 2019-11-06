import { personalData as personalDataReducer } from './personal-data.reducer'
import { PersonalDataAction } from '@state/actions'
import { PersonalData } from '@models'

describe('personal data reducer', () => {
  let data: PersonalData
  let state: PersonalData | null | undefined

  beforeEach(() => {
    data = {
      name: 'Name'
    } as PersonalData
    state = null
  })

  describe('with undefined state', () => {
    state = undefined
    const action = {
      type: 'NOT_AN_ACTION' as PersonalDataAction,
      payload: data
    }
    expect(personalDataReducer(state, action)).toEqual(null)
  })

  describe('SET_PERSONAL_DATA', () => {
    test('should return the payload', () => {
      const action = {
        type: PersonalDataAction.SET_PERSONAL_DATA,
        payload: data
      }
      expect(personalDataReducer(state, action)).toEqual(data)
    })
  })
})
