import { h } from 'preact'

import * as styles from './hex-image.scss'

export default function HexImage () {
  return (
    <svg viewBox='0 0 100 116' className={styles.hexImage}>
      <defs>
        <path
          id='hex'
          d='M50,0 L100,28.87 L100,86.6 L50,115.47 L0,86.6 L0,28.87 z'
          stroke='#ffffff'
          fill='none'
        />
      </defs>
      <use xlinkHref='#hex' />
    </svg>
  )
}
