import * as React from 'react'

import * as styles from './landing.scss'
import Header from '@components/header'

interface Props {}

export default function Landing (props: Props) {
  return <div className={styles.landing}>
    <Header />
  </div>
}
