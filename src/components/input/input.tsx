import { h } from 'preact'

import * as styles from './input.scss'

interface Props {
  label: string
  value: string | number
  onChange: (event: InputEvent) => void
}

export default function Input (props: Props) {
  return (
    <label className={styles.wrapper}>
      <span className={styles.label}>{props.label}</span>
      <input className={styles.input} value={props.value} onChange={props.onChange} />
      <span className={styles.focusIndicator}></span>
    </label>
  )
}
