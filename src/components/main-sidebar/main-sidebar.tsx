import * as React from 'react'

import * as styles from './main-sidebar.scss'
import { Character } from '@models'

interface Props {
  count: number
  favorite: Character
  newest: Character
  recent: Character[]
}

function getRecentList (recent: Character[]) {
  return recent.map(character => <div key={character.id}>{character.personalData.name}</div>)
}

export default function MainSidebar (props: Props) {
  return (
    <div className={styles.mainSidebar}>
      <div className={styles.contentWrapper}>
        <span className={styles.characters}>
          <span className={styles.count}>{props.count}</span>
          characters
        </span>
        <div className={styles.sublist}>
          <div className={styles.label}>Favorite</div>
          <div>{props.favorite.personalData.name}</div>
        </div>
        <div className={styles.sublist}>
          <div className={styles.label}>Newest</div>
          <div>{props.newest.personalData.name}</div>
        </div>
        <div className={styles.sublist}>
          <div className={styles.label}>Recent</div>
          {getRecentList(props.recent)}
        </div>
      </div>
    </div>
  )
}
