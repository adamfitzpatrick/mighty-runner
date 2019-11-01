import * as React from 'react'

import Logo from '@components/logo'
import * as styles from './header.scss'

interface Props {
  text?: string
}

export default function Header ({ text }: Props) {
  text = text || 'Mighty Runner'
  return <header className={styles.header}>
    <Logo />
    <h1 className={styles.headerText}>{ text }</h1>
  </header>
}
