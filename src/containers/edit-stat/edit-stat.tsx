import { h, Component } from 'preact'
import { inject } from 'mobx-preact'

import * as styles from './edit-stat.scss'
import Input from '@components/input'
import { CharacterProps } from '@state/character-store'
import { setableAttributeProperties } from '@models'

type Props = CharacterProps & {
  attributePath: string[]
}

@inject('character')
export default class EditStat extends Component<Props> {

  getAttributeValueChangeHandler = (property: 'initial' | 'creationPoints' | 'maximum') => {
    return (event: InputEvent) => {
      const attribute = this.props.character!.active!.getAttributeFromPath(this.props.attributePath)
      attribute[property] = parseInt(event.target.value, 10)
      this.props.character!.updateAttribute(this.props.attributePath, attribute)
    }
  }

  renderAttributeValues () {
    const attributeName = this.props.attributePath[this.props.attributePath.length - 1]
    const attribute = this.props.character!.active!.getAttributeFromPath(this.props.attributePath)
    const valueInputs = setableAttributeProperties.map(value => {
      return <Input
        value={ attribute[value] }
        label={ value }
        onChange={this.getAttributeValueChangeHandler(value)}
      />
    })
    return (
      <div>
          <h1 className={styles.statName}>{ attributeName }</h1>
          { valueInputs }
      </div>
    )
  }

  renderEffects () {
    return <div>Effects</div>
  }

  render () {
    return (
      <div className={styles.editStatWrapper}>
        <div className={styles.editStat}>
          { this.renderAttributeValues() }
          { this.renderEffects() }
        </div>
      </div>
    )
  }
}
