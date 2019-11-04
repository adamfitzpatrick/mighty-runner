import * as React from 'react'

import * as styles from './main-sidebar.scss'
import { Character } from '@models'

interface Props {
  count: number
  favorite: Character
  newest: Character
  recent: Character[]
}

export default function MainSidebar (props: Props) {
  let favorite = { personalData: { name: 'Favorite' } } as Character
  let newest = { personalData: { name: 'Newest' } } as Character
  let recent = [
    favorite,
    newest,
    { personalData: { name: 'This One' } },
    { personalData: { name: 'That One' } },
    { personalData: { name: 'T\'Other One' } }
  ]
  return (
    <div className={styles.mainSidebar}>
      <div className={styles.contentWrapper}>
        <span className={styles.characters}>
          <span className={styles.count}>{props.count}</span>
          characters
        </span>
        <div className={styles.sublist}>
          <span className={styles.label}>Favorite</span>
          {favorite.personalData.name}
        </div>
        <div className={styles.sublist}>
          <span className={styles.label}>Newest</span>
          {newest.personalData.name}
        </div>
      </div>
    </div>
  )
}
