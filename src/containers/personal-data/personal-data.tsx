import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@state/default-state'
import * as Models from '@models'
import { setPersonalDataCreator, saveCharacterCreator } from '@state/actions'
import Input, { InputType } from '@components/input'

import * as styles from './personal-data.scss'
import ShowStat from '@components/show-stat'

export function PersonalData () {
  const personalData = useSelector<AppState, Models.PersonalData>(state => state.personalData!)

  if (!personalData) { return null }

  return (
    <React.Fragment>
      <p className={styles.description}>{personalData.description}</p>
      <div className={styles.data}>
        <ShowStat value={personalData.metatype} label='metatype' classes={styles.stat} />
        <ShowStat value={personalData.ethnicity} label='ethnicity' classes={styles.stat} />
        <ShowStat value={personalData.age} label='age' classes={styles.stat} />
        <ShowStat value={personalData.gender} label='gender' classes={styles.stat} />
        <ShowStat value={personalData.streetCred} label='street cred' classes={styles.stat} />
        <ShowStat value={personalData.notoriety} label='notoriety' classes={styles.stat} />
        <ShowStat
          value={personalData.publicAwareness}
          label='public awareness'
          classes={[styles.stat, styles.span2]}
        />
        <ShowStat
          value={personalData.karma}
          label='karma'
          classes={styles.stat}
        />
        <ShowStat
          value={personalData.totalKarma}
          label='Total Karma'
          classes={styles.stat}
        />
        <ShowStat
          value={personalData.nuyen}
          label='Nuyen'
          classes={[styles.stat, styles.span2]}
        />
      </div>
    </React.Fragment>
  )
}

export function PersonalDataMock () {
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
