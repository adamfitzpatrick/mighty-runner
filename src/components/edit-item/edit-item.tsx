import * as React from 'react'

import * as styles from './edit-item.scss'
import { Stat } from '@models'
import Button from '@components/button'
import { EffectsById } from '@containers/effects'

export interface EditItemRenderProp<T extends Stat> {
  (item: T, changeHandler: (item: T) => void): JSX.Element
}

interface Props<T extends Stat> {
  item: T | null
  render: EditItemRenderProp<T>
  changeHandler: (item: T) => void
  done: () => void
}

export default function EditItem<T extends Stat> ({ item, render, changeHandler, done }: Props<T>) {
  const effects = item!.effects
  return (
    <div>
      {render(item!, changeHandler)}
      { effects ? <EffectsById ids={ effects } /> : null }
      <Button label='Done' onClick={ done } />
    </div>
  )
}
