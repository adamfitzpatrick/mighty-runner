import * as React from 'react'

import * as styles from './effect.scss'
import { useSelector } from 'react-redux'

import { Effect } from '@models'

interface Props {
  effect: Effect
  onToggle: (effect: Effect) => void
}

export default function Effect ({ effect, onToggle }: Props) {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updated = { ...effect, active: event.target.checked }
    onToggle(updated)
  }
  return (
    <div>
      <span>Name: { effect.name }</span>
      <label>
        Active
        <input
          type='checkbox'
          checked={effect.active}
          onChange={onChangeHandler}
        />
      </label>
    </div>
  )
}
