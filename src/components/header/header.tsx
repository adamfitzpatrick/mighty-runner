import * as React from 'react'
import classnames from 'classnames'

import Logo from '@components/logo'
import * as styles from './header.scss'

interface Props {
  text?: string
  static?: boolean
}

export default function Header (props: Props) {
  const text = props.text || 'Mighty Runner'
  return <header className={classnames(
    styles.header,
    { [styles.static]: props.static }
  )}>
    <Logo />
    <h1 className={styles.headerText}>{ text }</h1>
  </header>
}
