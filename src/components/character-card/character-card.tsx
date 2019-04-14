import { h } from 'preact'
import { route } from 'preact-router'

import { CharacterModel } from '@assets/models'

import Chart from '@components/chart'
import HexImage from '@components/hex-image'

import * as styles from './character-card.scss'

interface CharacterCardProps {
  character: CharacterModel
}

function getRouteHandler (characterId: string) {
  return () => route(`/character-detail/${characterId}`)
}

export default function CharacterCard ({ character }: CharacterCardProps) {
  return (
    <div
      className={styles.characterCard}
      onClick={ getRouteHandler(character.id) }
    >
      <button className={styles.buttonTarget}>View details for {character.name}</button>
      <div className={styles.data}>
        <div><span className={styles.descriptor}>{ character.metatype } { character.brief}</span></div>
        <div className={styles.name}>{ character.name }</div>
        <div className={styles.chart}>
          <Chart attributes={character.attributes}/>
        </div>
      </div>

      <div className={styles.image}>
        <HexImage image={character.image.url} showGradient={true}/>
      </div>
    </div>
  )
}
