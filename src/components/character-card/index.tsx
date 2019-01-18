import { h } from 'preact'

import { CharacterModel } from '@assets/models'
import * as styles from './character-card.scss'

interface CharacterCardProps {
  character: CharacterModel,
  select: () => void
}

export default function CharacterCard ({ character }: CharacterCardProps) {
  const imageDivStyle = {
    backgroundImage: `url(${character.imageUrl})`
  }

  return (
    <div className={styles.card}>
      <div style={imageDivStyle} className={styles.image} />
      <div className={styles.data}>
        <div>
          <h3 className={styles.name}>{character.name}</h3>
          <div className={styles.descriptor}>{character.metatype}</div>
          <div className={styles.descriptor}>{character.brief}</div>
        </div>
        <div className={styles.actions}>
          <i class='material-icons' onClick={this.props.select}>edit</i>
          <i class='material-icons'>delete_forever</i>
        </div>
      </div>
    </div>
  )
}
