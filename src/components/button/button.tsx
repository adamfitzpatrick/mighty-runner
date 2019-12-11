import * as React from 'react'
import classnames from 'classnames'

import * as styles from './button.scss'

interface Props {
  label: string,
  roundIcon?: boolean,
  onClick: () => void
}

export default function Button ({ label, roundIcon, onClick }: Props) {
  return (
    <button
      className={classnames(
        styles.button,
        {
          [styles.roundIcon]: roundIcon,
          'material-icons': roundIcon
        }
      )}
      data-testid={ `${label}.button.component` }
      onClick={ onClick }
    >
      { label }
    </button>
  )
}
