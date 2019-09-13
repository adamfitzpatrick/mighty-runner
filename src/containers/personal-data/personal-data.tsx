import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@state/initial-state'
import { PersonalData } from '@models'
import { setPersonalDataCreator, saveCharacterCreator } from '@state/actions'

// TODO Add remaining personal data items

export default function PersonalData () {
  const personalData = useSelector((state: AppState) => state.personalData)
  const dispatch = useDispatch()
  const setPersonalData = setPersonalDataCreator(dispatch)
  const saveCharacter = saveCharacterCreator(dispatch)

  if (!personalData) { return null }

  const getUpdater = (property: keyof PersonalData) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setPersonalData({
        ...personalData,
        [property]: event.target.value
      })
    }
  }

  const blurHandler = () => {
    saveCharacter()
  }

  return (
    <div>
      <label>
        <span>name</span>
        <input
          value={personalData.name}
          onChange={getUpdater('name')}
          onBlur={blurHandler}
        />
      </label>
    </div>
  )
}
