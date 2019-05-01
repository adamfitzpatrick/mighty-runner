import { h } from 'preact'
import { inject, observer } from 'mobx-preact'

import { CharacterModel } from '@assets/models'
import Button from '@components/button'
import DataField from '@components/data-field'
import { renderDataLine } from '@containers/character-detail'
import DetailBlock, { DetailBlockProps, DetailBlockState } from '@components/detail-block'

import * as styles from '@containers/character-detail/character-detail.scss'

@inject('character')
@observer
export default class PersonalDetail extends DetailBlock {
  state: DetailBlockState = {
    editing: false
  }

  render ({ character }: DetailBlockProps) {
    const active = JSON.parse(JSON.stringify(character!.active as CharacterModel))
    const dataLineRenderer = (valuePaths: string[]) => {
      return renderDataLine(valuePaths, active, this.state.editing, this.getInputHandler, this.getChangeHandler)
    }
    return (
      <div className={styles.detailSection}>
        <Button
          className={styles.edit}
          onClick={this.toggleEditing}
          text='edit'
          icon
          dark
        />
        <div className={styles.form}>
          <DataField
            label='name/primary alias'
            data={active.name}
            onInput={this.getInputHandler(this.state.editing, 'name')}
            onChange={this.getChangeHandler('name')}
          />
          <div
            className={styles.detailLine}
            style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
          >
            { dataLineRenderer([ 'metatype', 'ethnicity' ]) }
          </div>
          <div
            className={styles.detailLine}
            style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
          >
            { dataLineRenderer([ 'age', 'sex', 'weight', 'height' ]) }
          </div>
          <div
            className={styles.detailLine}
            style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
          >
            { dataLineRenderer([ 'streetCred', 'notoriety', 'publicAwareness' ])
            }
          </div>
          <div
            className={styles.detailLine}
            style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
          >
            { dataLineRenderer([ 'karma', 'lifetimeKarma' ]) }
          </div>
        </div>
      </div>
    )
  }
}
