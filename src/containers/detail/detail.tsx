import * as React from 'react'

import * as styles from './detail.scss'
import { RouteComponentProps } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { loadCharacterCreator } from '@state/actions'
import { AppState } from '@state/default-state'
import Header from '@components/header'
import * as Models from '@models'
import { PersonalData } from '@containers'

export interface DetailProps extends RouteComponentProps<{ characterId: string }> {}

function personalDataWrapper (personalData: Models.PersonalData) {
  return <div className={styles.personalData}>
    <Header text={personalData.name} notPositioned />
    <PersonalData />
  </div>
}

export default function Detail (props: DetailProps) {
  const dispatch = useDispatch()
  const loadCharacter = loadCharacterCreator(dispatch)
  const activeCharacter = useSelector<AppState, Models.CharacterIdentifier>(state => state.activeCharacter!)
  const personalData = useSelector<AppState, Models.PersonalData>(state => state.personalData!)
  const correctCharacter = activeCharacter && activeCharacter.id === props.match.params.characterId

  if (!correctCharacter) {
    loadCharacter(props.match.params.characterId)
    return <div>not found</div>
  }

  if (!activeCharacter || !personalData) {
    return <div>not found</div>
  }

  return (
    <div className={styles.detail}>
      { personalDataWrapper(personalData) }
    </div>
  )
}
