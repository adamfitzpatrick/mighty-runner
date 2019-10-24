import { Dispatch, Action } from 'redux'
import { PersonalData } from '@models'

export enum PersonalDataAction {
  SET_PERSONAL_DATA = 'SET_PERSONAL_DATA'
}

export const setPersonalDataCreator = (dispatch: Dispatch<Action<PersonalDataAction>>) => {
  return (personalData: PersonalData) => dispatch({
    type: PersonalDataAction.SET_PERSONAL_DATA,
    payload: personalData
  })
}
