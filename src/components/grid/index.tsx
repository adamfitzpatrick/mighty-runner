import { h } from 'preact'

import * as styles from './grid.scss'

interface GridProps {
  children: JSX.Element[]
}

export function GridRow ({ children }: GridProps) {
  return <div className={styles.gridRow}>
    {children}
  </div>
}

export function Grid ({ children }: GridProps) {
  return <div className={styles.grid}>
    {children}
  </div>
}
