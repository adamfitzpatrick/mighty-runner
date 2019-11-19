import * as React from 'react'

import * as styles from './summary.scss'
import { Character, Stat } from '@models'
import * as utils from '@services/character-utilities'
import ShowStat from '@components/show-stat'

interface AdditionalDataBlockProps {
  character: Character
}

export default function AdditionalDataBlock ({ character }: AdditionalDataBlockProps) {

  function getPreternaturalValue () {
    if (character.specialAttributes.magic.value.initial > 0) {
      return character.specialAttributes.magic
    }
    return character.specialAttributes.resonance
  }

  function getDivider (label: string) {
    return (
      <React.Fragment>
        <div className={styles.divider} />
        <div className={styles.label}>{label}</div>
        <div className={styles.divider} />
      </React.Fragment>
    )
  }

  return (
    <div className={styles.additionalDataBlock}>
      <ShowStat
        value={utils.getEffectiveValue(character.specialAttributes.edge, character.effects)}
        label={'edge'}
        classes={styles.stat}
      />
      <ShowStat
        value={utils.getEffectiveValue(character.attributes.essence, character.effects)}
        label={'essence'}
        classes={styles.stat}
      />
      <ShowStat
        value={utils.getEffectiveValue(getPreternaturalValue(), character.effects)}
        label={'M/R'}
        classes={styles.stat}
      />
      {getDivider('LIMITS')}
      <ShowStat
        value={utils.getPhysicalLimit(character)}
        label={'physical'}
        classes={styles.stat}
      />
      <ShowStat
        value={utils.getMentalLimit(character)}
        label={'mental'}
        classes={styles.stat}
      />
      <ShowStat
        value={utils.getSocialLimit(character)}
        label={'social'}
        classes={styles.stat}
      />
      {getDivider('CONDITION')}
      <ShowStat
        value={utils.getPhysicalConditionMonitor(character)}
        label={'physical'}
        classes={styles.stat2}
      />
      <ShowStat
        value={utils.getStunConditionMonitor(character)}
        label={'stun'}
        classes={styles.stat2}
      />
    </div>
  )
}
