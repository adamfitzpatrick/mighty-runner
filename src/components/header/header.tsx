import { h } from 'preact'

import Logo from '@components/logo'
import * as styles from './header.scss'

interface Props {
  showName?: boolean
}

export default function Header (props: Props) {
  return (
    <div className={styles.header}>
      <Logo />
      { props.showName ? 'Melodium Flynn' : 'Mighty Runner' }
    </div>
  )
}
