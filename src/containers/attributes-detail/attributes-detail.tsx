import { h } from 'preact'
import { inject, observer } from 'mobx-preact'

import { CharacterModel } from '@assets/models'
import Button from '@components/button'
import DetailBlock, { DetailBlockProps, DetailBlockState } from '@components/detail-block'

import * as styles from '@containers/character-detail/character-detail.scss'

@inject('character')
@observer
export default class AttributesDetail extends DetailBlock {
  state: DetailBlockState = {
    editing: false
  }

  render ({ character }: DetailBlockProps) {
    const active = character!.active as CharacterModel
    return (
      <div className={styles.detailSection}>
        <Button
          className={styles.edit}
          onClick={this.toggleEditing}
          text='edit'
          icon
          dark
        />
        <div
          className={styles.detailLine}
          style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
        >
          { this.dataLineRenderer([ 'attributes.body', 'otherAttributes.essense' ], active) }
        </div>
        <div
          className={styles.detailLine}
          style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
        >
          { this.dataLineRenderer([ 'attributes.agility', 'otherAttributes.Magic/Resonance' ], active) }
        </div>
        <div
          className={styles.detailLine}
          style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
        >
          { this.dataLineRenderer([ 'attributes.reaction', 'otherAttributes.initiative' ], active) }
        </div>
        <div
          className={styles.detailLine}
          style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
        >
          { this.dataLineRenderer([ 'attributes.strength', 'otherAttributes.matrixInitiative' ], active) }
        </div>
        <div
          className={styles.detailLine}
          style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
        >
          { this.dataLineRenderer([ 'attributes.willpower', 'otherAttributes.astralInitiative' ], active) }
        </div>
        <div
          className={styles.detailLine}
          style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
        >
          { this.dataLineRenderer([ 'attributes.logic', 'otherAttributes.composure' ], active) }
        </div>
        <div
          className={styles.detailLine}
          style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
        >
          { this.dataLineRenderer([ 'attributes.intuition', 'otherAttributes.judgeIntentions' ], active) }
        </div>
        <div
          className={styles.detailLine}
          style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
        >
          { this.dataLineRenderer([ 'attributes.charisma', 'otherAttributes.memory' ], active) }
        </div>
        <div
          className={styles.detailLine}
          style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
        >
          { this.dataLineRenderer([ 'attributes.edge', 'otherAttributes[Lift/Carry]' ], active) }
        </div>
      </div>
    )
  }
}
