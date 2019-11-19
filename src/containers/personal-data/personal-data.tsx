import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@state/default-state'
import * as Models from '@models'
import { setPersonalDataCreator, saveCharacterCreator } from '@state/actions'
import Input, { InputType } from '@components/input'

import * as styles from './personal-data.scss'

// TODO Add remaining personal data items

export default function PersonalData () {
  const personalData = useSelector((state: AppState) => state.personalData)
  const dispatch = useDispatch()
  const setPersonalData = setPersonalDataCreator(dispatch)
  const saveCharacter = saveCharacterCreator(dispatch)

  if (!personalData) { return null }

  const getUpdater = (property: keyof Models.PersonalData) => {
    return (value: InputType) => {
      setPersonalData({ ...personalData, [property]: value })
    }
  }

  const blurHandler = () => {
    saveCharacter()
  }

  const getInput = (field: keyof Models.PersonalData, label: string, type: InputType) => {
    return <Input
      type={ type }
      key={ field }
      label={ label }
      value={ personalData[field] || '' }
      onChange={ getUpdater(field) }
      onBlur={ blurHandler }
    />
  }

  return (
    <div data-testid='personal-data.container' className={styles.personalData}>
      { getInput('name', 'Name', 'text') }
      { getInput('role', 'Role', 'text') }
      { getInput('description', 'Description', 'text')}
      { getInput('metatype', 'Metatype', 'text') }
      { getInput('ethnicity', 'Ethnicity', 'text') }
      { getInput('gender', 'Gender', 'text') }
      { getInput('age', 'Age', 'text') }
      { getInput('height', 'Height', 'text') }
      { getInput('weight', 'Weight', 'text') }
      { getInput('karma', 'Karma', 'number') }
      { getInput('streetCred', 'Street Cred', 'number') }
      { getInput('notoriety', 'Notoriety', 'number') }
      { getInput('publicAwareness', 'Public Awareness', 'number') }
      { getInput('totalKarma', 'Total Karma', 'number') }
    </div>
  )
}
