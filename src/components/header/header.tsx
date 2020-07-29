import * as React from 'react'
import classnames from 'classnames'

import Logo from '@components/logo'
import * as styles from './header.scss'

interface Props {
  text?: string
  notPositioned?: boolean
}

export default function Header ({ text, notPositioned }: Props) {
  text = text || 'Mighty Runner'
  return <header className={classnames(
    styles.header,
    { [styles.static]: notPositioned }
  )}>
    <Logo />
    <h1 className={styles.headerText}>{ text }</h1>
  </header>
}
