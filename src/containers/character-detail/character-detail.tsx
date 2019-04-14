import { h, Component } from 'preact'
import { inject } from 'mobx-preact'

import { CharacterModel } from '@assets/models'
import { CharacterProps } from '@state/character-store'
import { ExpandableGroup, Expandable } from '@components/expandable'
import InfoItem from './info-item'

import * as styles from './character-detail.scss'

interface Props extends CharacterProps {
  characterId: string
}

@inject('character')
export default class CharacterDetail extends Component<Props, {}> {
  constructor (props: Props) {
    super(props)
    this.setActiveCharacter()
  }

  render () {
    const character = this.props.character!.active
    if (!character) { return null }
    return (
      <div className={styles.characterDetail}>
        <ExpandableGroup>
          <Expandable titleClass={styles.sectionExpander}>
            <h2 className={styles.sectionTitle}>Personal Data</h2>
            { this.renderPersonalDetails(character) }
          </Expandable>
          <Expandable titleClass={styles.sectionExpander}>
            <h2 className={styles.sectionTitle}>Attributes</h2>
            { this.renderPersonalDetails(character) }
          </Expandable>
        </ExpandableGroup>
      </div>
    )
  }

  private setActiveCharacter () {
    this.props.character!.active = (this.props.character!.list as CharacterModel[]).find(character => {
      return character.id === this.props.characterId
    })!
  }

  private renderPersonalDetails (character: CharacterModel) {
    return (
      <div className={styles.detailSection}>
        <InfoItem label='name/primary alias' data={ character.name } />
        <div className={styles.detailLine}>
          <InfoItem label='metatype' data={ character.metatype } />
          <InfoItem label='ethnicity' data={ character.ethnicity } />
        </div>
      </div>
    )
  }
}
