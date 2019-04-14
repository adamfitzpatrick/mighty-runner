import { h } from 'preact'
import classnames from 'classnames'

import * as styles from './character-detail.scss'

interface Props {
  label: string
  data: string
  className?: string
}

export default function InfoItem ({ label, data, className }: Props) {
  return (
    <div className={classnames(styles.infoItem, className)}>
      <div className={styles.label}>{ label }</div>
      <div className={styles.data}>{ data }</div>
    </div>
  )
}
