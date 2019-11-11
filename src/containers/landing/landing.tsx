import * as React from 'react'

import * as styles from './landing.scss'
import Header from '@components/header'
import MainSidebar from '@components/main-sidebar'
import { Character } from '@models'
import PicSelector from '@containers/pic-selector'
import { useDispatch } from 'react-redux'
import { loadCharacterCreator } from '@state/actions'

interface Props {}

export default function Landing (props: Props) {
  const dispatch = useDispatch()
  loadCharacterCreator(dispatch)('1')

  let favorite = { id: '1', personalData: { name: 'Melodium Flynn' } } as Character
  let newest = { id: '2', personalData: { name: 'Three Fathoms Down' } } as Character
  let recent = [
    favorite,
    newest,
    { id: '3', personalData: { name: 'This One' } },
    { id: '4', personalData: { name: 'That One' } },
    { id: '5', personalData: { name: 'T\'Other One' } }
  ] as Character[]

  return <div className={styles.landing}>
    <Header />
  </div>
}
