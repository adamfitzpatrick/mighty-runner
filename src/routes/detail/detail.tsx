import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import * as styles from './detail.scss'
import { AppState } from '@state/default-state'
import { loadCharacterCreator } from '@state/actions'
import Header from '@components/header'

type DetailProps = RouteComponentProps<{ characterId: string }>

export default function Detail (props: DetailProps) {
  const characterId = props.match.params.characterId
  const activeCharacter = useSelector((state: AppState) => state.activeCharacter)
  const personalData = useSelector((state: AppState) => state.personalData)!
  const dispatch = useDispatch()

  if (!activeCharacter || activeCharacter.id !== characterId) {
    loadCharacterCreator(dispatch)(characterId)
    return <div>Loading...</div>
  }

  return (
    <div className={styles.detail} data-testid={`detail.${activeCharacter.id}`}>
      <div>
        <Header text={personalData.name} static />
        <div>{personalData.description}</div>
        <div>MOAR DATA</div>
      </div>
    </div>
  )
}
