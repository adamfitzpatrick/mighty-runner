import * as React from 'react'

import * as styles from './edit-item.scss'

export interface EditItemRenderProp<T> {
  (item: T, changeHandler: (item: T) => void): JSX.Element | null
}

interface Props<T> {
  item: T | null
  render: EditItemRenderProp<T>
  changeHandler: (item: T) => void
  done: () => void
}

export default function EditItem<T> ({ item, render, changeHandler, done }: Props<T>) {
  if (!item) {
    return null
  }
  return (
    <div>
      {render(item, changeHandler)}
      <button onClick={done}>Done</button>
    </div>
  )
}
