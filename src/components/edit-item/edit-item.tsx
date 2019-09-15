import * as React from 'react'

import * as styles from './edit-item.scss'
import { Effectable } from '@models'

export interface EditItemRenderProp {
  (item: Effectable, changeHandler: (item: Effectable) => void): JSX.Element | null
}

interface Props {
  item: Effectable | null
  render: EditItemRenderProp
  changeHandler: (item: Effectable) => void
  done: () => void
}

export default function EditItem ({ item, render, changeHandler, done }: Props) {
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
