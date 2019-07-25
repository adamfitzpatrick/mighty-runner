import { h, Component } from 'preact'

import * as styles from './edit-attribute.scss'
import Input from '@components/input'
import { Effect, EffectableValue, Attribute } from '@models'
import characterDisplay from '@services/character-display-service'
import Stat from '@components/stat'
import Button from '@components/button'
import EffectToggle from '@components/effect-toggle';

type Props = {
  attribute: Attribute
  effectedBy: Effect[],
  effects: Effect[]
}

export default class EditAttribute extends Component<Props> {
  render () {
    const effectiveValue = characterDisplay.getEffectedValue(this.props.attribute, this.props.effectedBy)
    return (
      <div className={styles.editAttributeWrapper}>
        <div className={styles.editAttribute}>
            <h1 className={styles.statName}>{this.props.attribute.name}</h1>
            <h2 className={styles.effectsListName}>Effected By</h2>
            <h2 className={styles.effectsListName}>Generates Effects On</h2>
            <div>
              { this.renderValues(this.props.attribute.value) }
              { this.renderOtherProps(this.props.attribute) }
            </div>
            { this.renderEffects() }
            <div></div>
            <Stat label='' value={effectiveValue} round />
            <div className={styles.addEffect}>
              <Button onClick={ () => { console.log('hit') } } icon primary>
                <i className='material-icons'>add</i>
              </Button>
            </div>
        </div>
      </div>
    )
  }

  private renderValue (key: string, value: number) {
    return <Input label={key} value={value} onChange={event => console.log(event)} />
  }

  private renderValues (values: EffectableValue) {
    return (
      <div className={styles.values}>
        { Object.keys(values).map(key => this.renderValue(key, values[key]))}
      </div>
    )
  }

  private renderOtherProps (attribute: Attribute) {
    return (
      <div className={styles.otherProps}>
        <Input value={attribute.maximum} label='maximum' onChange={event => console.log(event)} />
      </div>
    )
  }

  private renderEffect (effect: Effect) {
    return (
      <EffectToggle effect={effect} toggleHandler={() => { /* */ }} />
    )
  }

  private renderEffects () {
    const effects = characterDisplay.getRelatedEffects(this.props.attribute, this.props.effectedBy)
    return (
      <div>
        { effects.map(this.renderEffect) }
      </div>
    )
  }
}
