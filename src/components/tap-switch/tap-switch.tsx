import * as React from 'react'

import * as styles from './tap-switch.scss'
import { ReactNodeArray } from 'prop-types'

type TapSwitchProps = {
  children: ReactNodeArray
}

type TapSwitchState = {
  displayedChild: number
}

/**
 * Component for the purpose of displaying provided data, one child at a time.
 * Each time the user clicks on the component, the displayed child advances to
 * the next one in the array.  Note that, because of the way the button element
 * overlays the provided children and fills the full width of the element, this
 * component should be wrapped in a parent with defined width and height values
 * to ensure the proper size of both the displayed child components and the
 * button overlay.
 */
export default function TapSwitch ({ children }: TapSwitchProps) {
  const [ state, setState ] = React.useState<TapSwitchState>({ displayedChild: 0 })

  const onClick = () => {
    setState(lastState => {
      const displayedChild = lastState.displayedChild < children.length - 1 ?
        lastState.displayedChild + 1 :
        0
      return { displayedChild }
    })
  }

  return <div className={styles.tapSwitch}>
    { children[state.displayedChild] }
    <button
      data-testid='tapswitch.button'
      onClick={onClick}
      className={styles.button}
    >
      Click to switch display
    </button>
  </div>
}
