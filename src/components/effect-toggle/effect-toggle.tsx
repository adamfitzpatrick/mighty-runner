import { h } from 'preact'
import classnames from 'classnames'

import * as styles from './effect-toggle.scss'
import { Effect } from '@models'

interface Props {
  effect: Effect
  toggleHandler: (effectId: string) => void
}

function effectAriaLabel (effect: Effect) {
  return `${effect.name}, value ${effect.value}, ${effect.active ? 'active' : 'inactive'}`
}

export default function EffectToggle ({ effect, toggleHandler }: Props) {
  return (
    <label
      key={effect.id}
      className={styles.effectToggle}
      aria-label={ effectAriaLabel(effect) }
      aria-live
    >
      <input
        type='checkbox'
        value={effect.id}
        onClick={() => toggleHandler(effect.id)}
        checked={effect.active}
        className={styles.effectInput}
      />
      <span className={styles.effectFocusIndicator} />
      <span className={classnames(
        styles.effectIndicator,
        { [styles.active]: effect.active }
      )} />
      <span className={styles.effectName}>{ effect.name }</span>
      <span className={styles.effectValue}>{ effect.value }</span>
    </label>
  )
}
