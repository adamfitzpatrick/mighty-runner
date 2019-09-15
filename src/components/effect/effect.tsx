import * as React from 'react'

import * as styles from './effect.scss'
import { useSelector } from 'react-redux'

import { Effect } from '@models'

interface Props {
  effect: Effect
  onToggle: (active: boolean) => void
}

export default function Effect ({ effect, onToggle }: Props) {
  return (
    <div>
      <span>Name: { effect.name }</span>
      <label>
        <span>Active</span>
        <input
          type='checkbox'
          checked={effect.active}
          onChange={event => onToggle(event.target.checked)}
        />
      </label>
    </div>
  )
}
