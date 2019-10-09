import * as React from 'react'

import * as styles from './edit-item.scss'
import { Stat, Effect } from '@models'
import Button from '@components/button'
import { EffectsById } from '@containers/effects'

export interface EditItemRenderProp<T extends Stat> {
  (item: T, changeHandler: (item: T) => void): JSX.Element
}

interface Props<T extends Stat> {
  item: T
  render: EditItemRenderProp<T>
  changeHandler: (item: T) => void
  done: () => void,
  cancel?: () => void
}

export default function EditItem<T extends Stat> (
  { item, render, changeHandler, done, cancel }: Props<T>
) {
  const effects = item.effects

  const handleAddedEffect = (effect: Effect) => {
    const updated = Object.assign({}, item)
    updated.effects = (updated.effects || []).concat(effect.id)
    changeHandler(updated)
  }

  return (
    <div data-testid={`${item!.name}.edit-item.component`} className={styles.editItem}>
      {render(item!, changeHandler)}
      <EffectsById ids={ effects || [] } edit onAdd={handleAddedEffect} />
      <Button label='Done' onClick={ done } />
      { cancel ? <Button label='Cancel' onClick={ cancel } /> : null }
    </div>
  )
}
