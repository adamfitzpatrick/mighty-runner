import * as React from 'react'
import { Character } from '@models'

import * as styles from './character-form-mock.scss'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@state/default-state'
import { loadCharacterCreator } from '@state/actions'
import { RouteComponentProps } from 'react-router'

import { PersonalDataMock } from '@containers'
import Attributes from '@containers/attributes'
import Gear from '@containers/gear'

type CharacterFormMockProps = RouteComponentProps<{ characterId: string }>

function immutablyCopyCharacter (character: Character): Character {
  return JSON.parse(JSON.stringify(character))
}

function recurseObjectToUpdateValue (obj: { [key: string]: any }, path: string[], value: any) {
  if (path.length === 1) {
    obj[path[0]] = value
    return
  } else {
    const newPath = ([] as string[]).concat(path)
    const newObj = obj[newPath.shift()!]
    recurseObjectToUpdateValue(newObj, newPath, value)
  }
}

function modifyCharacterValue (
  character: Character,
  path: string | string[],
  value: any
): Character {
  const newChar = immutablyCopyCharacter(character)
  if (typeof path === 'string') {
    (newChar as { [key: string]: any })[path] = value
  } else {
    recurseObjectToUpdateValue(newChar, path, value)
  }
  return newChar
}

export default function CharacterFormMock (props: CharacterFormMockProps) {
  const activeCharacter = useSelector((state: AppState) => state.activeCharacter)
  const dispatch = useDispatch()

  if (!activeCharacter) {
    loadCharacterCreator(dispatch)(props.match.params.characterId)
    return <div>no data</div>
  }

  return (
    <div className={styles.characterForm}>
      <div>
        <span>userId</span>
        <strong>{activeCharacter.userId}</strong>
      </div>
      <div>
        <span>id</span>
        <strong>{activeCharacter.id}</strong>
      </div>
      <div>
        <span>updated</span>
        <strong>{activeCharacter.updated}</strong>
      </div>
      <PersonalDataMock />
      <Attributes />
      <Gear />
    </div>
  )
}
