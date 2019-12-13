import * as React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import * as styles from './new-character.scss'
import Button from '@components/button'
import { flattenCharacter } from '@state/middleware/middleware-utility'
import { generateMinimumViableCharacter } from '@services/character-services'

export default function NewCharacter () {
  const dispatch = useDispatch()
  const history = useHistory()

  function clickHandler () {
    const newCharacter = generateMinimumViableCharacter()
    flattenCharacter(newCharacter, dispatch)
    history.push(`/form/${newCharacter.id}`)
  }

  return (
    <div className={styles.newCharacter}>
      <Button roundIcon label='add' onClick={clickHandler} />
    </div>
  )
}
