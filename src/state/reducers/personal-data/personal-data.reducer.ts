import defaultState from '../../default-state'
import { PersonalData } from '@models'
import { Action, PersonalDataAction } from '../../actions'

export function personalData (
  state: PersonalData | null = defaultState.personalData,
  action: Action<PersonalDataAction, PersonalData>
) {
  switch (action.type) {
    case PersonalDataAction.SET_PERSONAL_DATA:
      return action.payload
    default:
      return state
  }
}
