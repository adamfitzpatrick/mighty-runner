import * as React from 'react'
import classnames from 'classnames'

import * as styles from './show-stat.scss'

interface Props {
  value: number | string
  label: string
  classes?: string | string[]
}

export default function ShowStat ({ value, label, classes }: Props) {
  value = value === 0 ? value : value || '--'
  return (
    <div className={classnames(
      styles.showStat,
      classes
    )}>
      <div className={styles.label}>{ label }</div>
      <div className={styles.value}>{ value }</div>
    </div>
  )
}
