import { h, Component } from 'preact'
import * as styles from './data-tester.scss'

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
  path?: string
}

interface State {
  character?: any
}

export default class DataTester extends Component<Props, State> {
  character: any = undefined
  updatingValue: any = undefined

  constructor (props: Props) {
    super(props)
    this.state = {}
  }

  getValue (valuePath: string | string[], currentObj?: any): string | number {
    if (typeof valuePath === 'string') {
      valuePath = valuePath.split('.')
      return this.getValue(valuePath, this.state.character)
    }
    if (valuePath.length === 0) {
      return currentObj
    }
    return this.getValue(valuePath, currentObj[valuePath.shift()!])
  }

  setValue (value: any, valuePath: string | string[], currentObj?: any): any {
    if (typeof valuePath === 'string') {
      valuePath = valuePath.split('.')
      this.character = JSON.parse(JSON.stringify(this.state.character))
      return this.setValue(value, valuePath, this.character)
    }
    if (valuePath.length === 1) {
      currentObj[valuePath.shift()!] = value
      return updateCharacter(1, this.character).then(() => this.setState({ character: this.character }))
    }
    return this.setValue(value, valuePath, currentObj[valuePath.shift()!])
  }

  onChange = (event: InputEvent) => {
    let value = parseInt(event.target.value, 10) || parseFloat(event.target.value) || event.target.value
    this.updatingValue = value
  }

  onFocus = (event: FocusEvent) => {
    const target = event.target as HTMLInputElement
    let value = parseInt(target.value, 10) || parseFloat(target.value) || target.value
    this.updatingValue = value
  }

  showInput (label: string, valuePath: string) {
    const value = this.getValue(valuePath)
    return <label>
      {label}
      <input
        className={styles.input}
        type='text'
        value={value}
        onChange = { this.onChange }
        onFocus={this.onFocus}
        onBlur={() => {
          this.setValue(this.updatingValue, valuePath)
        }}
      />
    </label>
  }

  getTotalMod (path: string) {
    return Object.keys(this.state.character.effects)
      .map(key => this.state.character.effects[key])
      .filter((effect: any) => effect.effectPath === path && effect.active === 'true')
      .reduce((totalMod, effect) => {
        return totalMod + effect.value
      }, 0)
  }

  getAttributes () {
    return (
      <div>
        <div className={styles.attribute}>
          <div>Body:</div>
          { this.showInput('Initial', 'attributes.body.initial') }
          { this.showInput('Creation', 'attributes.body.creationPoints') }
          <div>Mods { this.getTotalMod('attributes.body') }</div>
          <div>Total {this.state.character.attributes.body.initial + this.state.character.attributes.body.creationPoints + this.getTotalMod('attributes.body') }</div>
        </div>
        <div className={styles.attribute}>
          <div>Essence:</div>
          { this.showInput('Initial', 'attributes.body.initial') }
          <div>Mods { this.getTotalMod('otherAttributes.essence') }</div>
          <div>Total {this.state.character.attributes.body.initial + this.state.character.attributes.body.creationPoints + this.getTotalMod('otherAttributes.essence') }</div>
        </div>
      </div>
    )
  }

  getEffect (id: string) {
    const effect = this.state.character.effects[id]
    return (
      <div>
        { this.showInput('Name', `effects.${id}.name`) }
        { this.showInput('Effects', `effects.${id}.effectPath`) }
        { this.showInput('Active', `effects.${id}.active`) }
        { this.showInput('Value', `effects.${id}.value`) }
      </div>
    )
  }

  getGear () {
    return this.state.character && this.state.character.gear.map((gear: any, index: number) => {
      return <div key={gear.id}>
        <div>
          { this.showInput('Name', `gear.${index}.name`) }
          { this.showInput('Type', `gear.${index}.type`) }
          { this.showInput('Capacity', `gear.${index}.capacity`) }
        </div>
        <div className={styles.effect}>
          { this.getEffect('1') }
        </div>
      </div>
    })
  }

  render () {
    if (!this.state.character) {
      return <div>NO CHARACTER</div>
    }
    return (
      <div className={styles.dataTester}>
        <h2>Attributes</h2>
        { this.getAttributes() }
        <h2>Gear</h2>
        <div style={{ 'marginBottom': '2rem' }}>
          { this.getGear() }
        </div>
      </div>
    )
  }

  componentWillMount () {
    getCharacter(1)
      .then(character => this.setState({ character: character }))
      .catch(err => console.log(err))
  }
}
