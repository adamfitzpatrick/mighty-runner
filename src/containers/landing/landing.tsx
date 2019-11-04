import * as React from 'react'

import * as styles from './landing.scss'
import Header from '@components/header'
import MainSidebar from '@components/main-sidebar'
import { Character } from '@models'

interface Props {}

export default function Landing (props: Props) {
  let favorite = { personalData: { name: 'Melodium Flynn' } } as Character
  let newest = { personalData: { name: 'Three Fathoms Down' } } as Character
  let recent = [
    favorite,
    newest,
    { personalData: { name: 'This One' } },
    { personalData: { name: 'That One' } },
    { personalData: { name: 'T\'Other One' } }
  ] as Character[]
  return <div className={styles.landing}>
    <Header />
    <MainSidebar
      count={16}
      favorite={favorite}
      newest={newest}
      recent={recent}
    />
  </div>
}
