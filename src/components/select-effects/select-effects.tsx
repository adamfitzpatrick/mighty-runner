import { h, Ref } from 'preact'
import classnames from 'classnames'
import { Effect } from '@models'
import * as styles from './select-effects.scss'
import EffectToggle from '@components/effect-toggle';

interface Props {
  effects: Effect[]
  toggleHandler: (effectId: string) => void
  parentStat: HTMLElement
  visible?: boolean
  left?: boolean
  top?: boolean
}

export default function SelectEffects (props: Props) {
  const statWidth = props.parentStat && props.parentStat.offsetWidth
  const totalWidth = `calc(${statWidth}px + 14rem)`

  function getTextMargin () {
    let property = 'margin-left'
    if (props.left) {
      property = 'margin-right'
    }
    return { [property]: `calc(${statWidth}px + 2rem)` }
  }

  function renderEffect (effect: Effect) {
    return <EffectToggle effect={effect} toggleHandler={props.toggleHandler} />
  }

  return (
    <div
      className={classnames(
        styles.effects,
        {
          [ styles.visible ]: props.visible,
          [ styles.left ]: props.left,
          [ styles.top ]: props.top
        }
      )}
      style={{
        width: props.visible ? totalWidth : 0
      }}
    >
      <div className={styles.list}>
        { props.effects.map(renderEffect) }
      </div>
      <div
        className={styles.editButton}
        style={ getTextMargin() }
      >
        edit stat...
      </div>
    </div>
  )
}
