import { h } from 'preact'

import Logo from '@components/logo'
import * as styles from './loader.scss'
import Glitch from '@components/glitch';

export default function Loader () {
  return (
    <Glitch>
      <div className={styles.loader}>
        <Logo />
      </div>
    </Glitch>
  )
}
