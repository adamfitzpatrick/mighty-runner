import { h } from 'preact'
import classnames from 'classnames'

import * as styles from './button.scss'

interface Props {
  text: string,
  className?: string
  icon?: boolean
  dark?: boolean
  critical?: boolean
  primary?: boolean
  onClick: () => void
  type?: string
}

export default function (props: Props) {
  const classes = classnames(
    props.className,
    styles.button,
    { 'material-icons': props.icon },
    { [styles.icon]: props.icon },
    { [styles.dark]: props.dark },
    { [styles.critical]: props.critical },
    { [styles.primary]: props.primary && !props.critical }
  )
  return (
    <button className={ classes } onClick={props.onClick} type={props.type || 'button'}>
      { props.text }
    </button>
  )
}
