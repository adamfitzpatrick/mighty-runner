import { h, Component } from 'preact'
import { inject, observer } from 'mobx-preact'
import classnames from 'classnames'

import Stat from '@components/stat'
import * as styles from './smart-stat.scss'
import { ActiveCharacterProps } from '@state/active-character-store'
import SelectEffects from '@components/select-effects'
import { Effectable, Attributes, Attribute, EffectableValue } from '@models'
import characterDisplay from '@services/character-display-service'

type Props = ActiveCharacterProps & {
  statName: string
  effectableGroup: any
  round?: boolean
}

interface State {
  showEffects: boolean
  editStat: boolean
  top: boolean
  left: boolean
}

@inject('activeCharacter')
@observer
export default class SmartStat extends Component<Props, State> {
  statRef: HTMLElement
  element: HTMLElement

  constructor (props: Props) {
    super(props)
    this.state = {
      showEffects: false,
      editStat: true,
      top: false,
      left: false
    }
  }

  render () {
    const effects = characterDisplay.getRelatedEffects(this.getStat(), this.props.activeCharacter!.effects!)
    return (
      <div
        className={classnames(
          styles.smartStat,
          { [styles.round]: this.props.round }
        )}
        ref={ref => this.element = ref}
      >
        { this.renderEffectsButton() }
        { this.renderStat() }
        <SelectEffects
          effects={effects}
          toggleHandler={this.effectClickHandler}
          top={this.state.top}
          left={this.state.left}
          visible={this.state.showEffects}
          parentStat={this.statRef}
        />
      </div>
    )
  }

  componentWillMount () {
    document.addEventListener('click', this.identifyExternalFocus)
  }

  componentDidMount () {
    const rect = this.element.getBoundingClientRect()
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    if (rect.left > screenWidth / 2) {
      this.setState({ left: true })
    }
    if (rect.top > screenHeight / 2) {
      this.setState({ top: true })
    }
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.identifyExternalFocus)
  }

  private getStat (): Attribute {
    return ((this.props.activeCharacter as any)[this.props.effectableGroup])[this.props.statName]
  }

  private identifyExternalFocus = (event: Event) => {
    if (!this.element.contains(event.target as Node)) {
      this.setState({ showEffects: false })
    }
  }

  private showEffectsHandler = () => {
    this.setState((state: State) => ({ showEffects: !state.showEffects }))
  }

  private showEffectsAriaLabel = () => {
    return `${this.props.statName }: Select active effects`
  }

  private effectClickHandler = (effectId: string) => {
    this.props.activeCharacter!.toggleEffect(effectId)
  }

  private getBaseStatValue = (): number => {
    const stat = this.getStat()
    return Object.keys(stat.value).reduce((accum: number, key: string) => {
      return accum + (stat.value as EffectableValue)[key]
    }, 0)
  }

  private getEffectedStatValue = (): number => {
    const effects = characterDisplay.getRelatedEffects(this.getStat(), this.props.activeCharacter!.effects!)
    return this.getBaseStatValue() + effects.reduce((accum, effect) => {
      return accum + (effect.active ? effect.value : 0)
    }, 0)
  }

  private renderEffectsButton () {
    return (
      <button
        className={styles.button}
        onClick={this.showEffectsHandler}
        aria-label={this.showEffectsAriaLabel()}
      >
        <span className={styles.buttonFocusIndicator} />
      </button>
    )
  }

  private renderStat () {
    const stat = this.getStat()
    const label = this.props.round ? stat.shortName : stat.name
    return (
      <div
        ref={ref => this.statRef = ref}
        className={styles.stat}
      >
        <Stat
          label={label}
          value={ this.getEffectedStatValue() }
          round={ this.props.round }
        />
      </div>
    )
  }
}
