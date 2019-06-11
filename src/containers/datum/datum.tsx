import { h, Component } from 'preact'
import classnames from 'classnames'

import * as styles from './datum.scss'

async function getCharacter (id: number) {
  return fetch(`http://localhost:3000/character/${id}`).then(response => response.json())
}

async function updateCharacter (id: number, character: any) {
  return fetch(`http://localhost:3000/character/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(character)
  })
}

interface Props {
  visible: boolean
  close: JSX.EventHandler<MouseEvent>
}

interface State {
  character: any
}

export default class Datum extends Component<Props, State> {
  element: any
  displayElement: any
  state = { character: {} }

  render () {
    return (
      <span>
        <div ref={ ref => this.displayElement = ref } className={classnames(
          styles.displayWrapper,
          { [styles.displayWrapperVisible]: this.props.visible }
        )}>{ this.props.children }
          <div
            ref={ref => this.element = ref}
            className={classnames(
              styles.datum,
              { [styles.datumVisible]: this.props.visible }
            )}
            style={{
              maxHeight: this.props.visible ? this.element && this.element.scrollHeight + 16 : 0
            }}
            onClick={this.props.close}
          >
            <div className={styles.mod}>
              <input type='checkbox' />
              <label>Berwick Suit</label>
              <div>+2</div>
            </div>
            <div className={styles.mod}>
              <input type='checkbox' />
              <label>First Impression</label>
              <div>+2</div>
            </div>
            <div className={styles.mod}>
              <input type='checkbox' />
              <label>Tailored Pheremones</label>
              <div>+3</div>
            </div>
            <div className={styles.editLink}>Edit definition...</div>
          </div>
        </div>
      </span>
    )
  }

  componentWillMount () {
    getCharacter(1).then(
      character => this.setState({ character }),
      () => console.log('oh nooos!')
    )
  }
}
