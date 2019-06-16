import { h } from 'preact'
import classnames from 'classnames'

import * as styles from './stat.scss'

interface Props {
  label: string
  value: string | number,
  standard?: boolean,
  round?: boolean
}

function standardStat (label: string, value: string | number) {
  return <div className={styles.stat}>
    <div className={styles.label}>{ label }</div>
    <div>{ value }</div>
  </div>
}

function roundStat (label: string, value: string | number) {
  return <div className={classnames(styles.stat, styles.round)}>
    <div>{ value }</div>
    <div className={styles.label}>{ label }</div>
  </div>
}

export default function Stat (props: Props) {
  return (props.round ? roundStat : standardStat).call(null, props.label, props.value)
}
