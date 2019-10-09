import * as React from 'react'

import * as styles from './add-item.scss'
import { Stat } from '@models'
import EditItem, { EditItemRenderProp } from '@components/edit-item'

interface Props<T extends Stat> {
  item: T
  render: EditItemRenderProp<T>
  changeHandler: (item: T) => void
  done: () => void,
  cancel?: () => void
}

export default function AddItem<T extends Stat> (
  { item, render, changeHandler, done, cancel }: Props<T>
) {
  return (
    <EditItem
      item={ item }
      render={ render }
      changeHandler={ changeHandler }
      done={ done }
      cancel={ cancel }
    />
  )
}
