import { h, RenderableProps } from 'preact'
import classnames from 'classnames'

import * as styles from './button.scss'

interface Props extends RenderableProps<{}> {
  onClick: (event: Event) => void
  ariaLabel?: string
  icon?: boolean
  primary?: boolean
}

export default function Button ({ children, onClick, ariaLabel, icon, primary }: Props) {
  return (
    <button
      className={ classnames(
        styles.button,
        {
          [styles.icon]: icon,
          [styles.primary]: primary
        }
      )}
      onClick={ onClick }
      aria-label={ ariaLabel }
    >
      <span className={styles.buttonFocusIndicator} />
      { children }
    </button>
  )
}
