import { h } from 'preact'

import * as styles from './character-sheet.scss'
import { AppStateModel } from '@components/app';

export default function CharacterSheet (props: AppStateModel) {
  return (
    <div className={styles.sheet}>
      {props.currentCharacter.name} {props.currentCharacter.brief}
    </div>
    )
}
