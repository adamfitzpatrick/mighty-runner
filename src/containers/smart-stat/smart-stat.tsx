import { h, Component } from 'preact'
import { inject, observer } from 'mobx-preact'
import classnames from 'classnames'

import { CharactersProps } from '@state/characters-store'
import Stat from '@components/stat'
import * as styles from './smart-stat.scss'
import { CharacterProps } from '@state/character-store'
import { Effect } from '@models'
import EditStat from '@containers/edit-stat'

type Props = CharactersProps & CharacterProps & {
  attributePath: string[]
  round?: boolean
  standard?: boolean
}

interface State {
  showEffects: boolean
  editStat: boolean
  top: boolean
  left: boolean
}

@inject('character')
@observer
export default class SmartStat extends Component<Props> {
  state = {
    showEffects: false,
    editStat: true,
    top: false,
    left: false
  }
  element: HTMLElement

  identifyExternalFocus = (event: Event) => {
    if (!this.element.contains(event.target as Node)) {
      this.setState({ showEffects: false })
    }
  }

  showEffectsHandler = () => {
    this.setState((state: State) => ({ showEffects: !state.showEffects }))
  }

  showEffectsAriaLabel = () => {
    return `${this.props.attributePath.slice(-1) }: Select active effects`
  }

  effectClickHandler = (effectId: string) => {
    this.props.character!.toggleEffect(effectId)
  }

  effectAriaLabel = (effect: Effect) => {
    return `${effect.name}, value ${effect.value}, ${effect.active ? 'active' : 'inactive'}`
  }

  editBlurHandler = () => {
    this.setState({ showEffects: false })
  }

  renderEffectsButton () {
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

  renderStat () {
    return <div className={styles.stat}>
      <Stat
        label='agi'
        value={ this.props.character!.active!.getEffectiveValue(this.props.attributePath) }
        round={ this.props.round }
        standard={ this.props.standard }
      />
    </div>
  }

  renderEffect (effect: Effect, index: number, effects: Effect[]) {
    if (!this.state.showEffects) {
      return <div className={styles.effect} />
    }

    return (
      <label
        key={effect.id}
        className={styles.effect}
        aria-label={ this.effectAriaLabel(effect) }
        aria-live
      >
        <input
          type='checkbox'
          value={effect.id}
          onClick={() => this.effectClickHandler(effect.id)}
          checked={effect.active}
          className={styles.effectInput}
        />
        <span className={styles.effectFocusIndicator} />
        <span className={classnames(
          styles.effectIndicator,
          { [styles.active]: effect.active }
        )} />
        <span className={styles.effectName}>{ effect.name }</span>
        <span>{ effect.value }</span>
      </label>
    )
  }

  renderEffects () {
    const effects = this.props.character!.active!.getEffectsForValue(this.props.attributePath)
    return (
      <div className={classnames(
        styles.effects,
        {
          [ styles.visible ]: this.state.showEffects,
          [ styles.left ]: this.state.left,
          [ styles.top ]: this.state.top
        }
      )}>
        { effects.map(this.renderEffect, this) }
        <button
          className={styles.editButton}
          onBlur={this.editBlurHandler}
          onClick={() => {}}
        >
          Edit {this.props.attributePath.slice(-1)} data...
        </button>
      </div>
    )
  }

  render () {
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
        { this.renderEffects() }
        { this.state.editStat ? <EditStat attributePath={this.props.attributePath} /> : null }
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
}
