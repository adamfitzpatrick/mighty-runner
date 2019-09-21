import * as React from 'react'

import * as styles from './button.scss'

interface Props {
  label: string,
  onClick: () => void
}

export default function Button ({ label, onClick }: Props) {
  return (
    <button
      data-testid={ `${label}.button.component` }
      onClick={ onClick }
    >
      { label }
    </button>
  )
}
