import { h, Component } from 'preact'
import HexImage from '@components/hex-image'
import { CharacterModel } from '@assets/models'
import Datum from '@containers/datum'

const character = {
  'id': '1',
  'name': 'Melodium Flynn',
  'metatype': 'Dwarf',
  'ethnicity': 'Irish',
  age: 23,
  sex: 'M',
  height: '4\' 3"',
  weight: '180lbs',
  streetCred: 8,
  notoriety: 1,
  publicAwareness: 2,
  karma: 16,
  totalKarma: 172,
  'role': 'Infiltrator/face with a tendency to shoot problems',
  'image': {
    'url': 'https://s3-us-west-2.amazonaws.com/mighty-runner-image-share/melodium_flynn.png',
    'thumbnailTransform': {
      'x': 0,
      'y': 0
    },
    'fullViewTransform': {
      'x': 0,
      'y': 0,
      'scale': 2
    }
  },
  'description': 'A compelling personality despite his short stature, Flynn leverages his dwarven qualities so as to be overlooked as a threat as he sweet-talks his victims out of the things they least desire to part with.',
  'attributes': {
    'body': 5,
    'agility': 6,
    'reaction': 5,
    'strength': 3,
    'willpower': 3,
    'logic': 3,
    'intuition': 5,
    'charisma': 7
  },
  'otherAttributes': {
    'essence': 3.8,
    'edge': 5,
    'Magic/Resonance': 0,
    'initiative': '11 + 1d6',
    'astralInitiative': '11 + 1d6',
    'matrixInitiative': '11 + 1d6',
    'composure': 10,
    'judgeIntentions': 12,
    'Lift/Carry': 8,
    'memory': 6,
    'movement': '12/24 +1m/hit'
  }
} as CharacterModel

function showImage () {
  return <div style={{
    position: 'fixed',
    top: '2rem',
    right: '2rem',
    width: '8rem'
  }}>
    <HexImage image={character.image} />
  </div>
}

function dataLabel (label: string) {
  return <label style={{
    textTransform: 'uppercase',
    fontSize: '0.5rem'
  }}>
    {label}
  </label>
}

function data (data: string | number, large?: boolean) {
  return <div style={{ marginBottom: large ? '0' : '1rem', fontSize: large ? '1.5rem' : '1rem' }}>
    {data}
  </div>
}

function showPersonalData () {
  return (
    <div style={{
      position: 'fixed',
      top: '8rem',
      left: '7rem',
      color: 'white',
      width: '80vw',
      fontWeight: '300',
      fontFamily: 'Lato',
      display: 'flex'
    }}>
      <div style={{ width: 'calc(45vw - 7rem)' }}>{ character.role }</div>
      <div style={{
        position: 'fixed',
        width: '40vw',
        top: '4.5rem',
        left: '45vw',
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        height: '3rem'
      }}>
        <div>
          {dataLabel('metatype')}
          {data(character.metatype)}
        </div>
        <div>
          {dataLabel('ethnicity')}
          {data(character.ethnicity)}
        </div>
        <div>
          {dataLabel('age')}
          {data(character.age)}
        </div>
        <div>
          {dataLabel('sex')}
          {data(character.sex)}
        </div>
        <div>
          {dataLabel('height')}
          {data(character.height)}
        </div>
        <div>
          {dataLabel('weight')}
          {data(character.weight)}
        </div>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 2fr 1fr 1fr',
        height: '3rem',
        width: '40vw',
        marginTop: '-0.5rem'
      }}>
        <div>
          {dataLabel('street cred')}
          {data(character.streetCred)}
        </div>
        <div>
          {dataLabel('notoriety')}
          {data(character.notoriety)}
        </div>
        <div>
          {dataLabel('public awareness')}
          {data(character.publicAwareness)}
        </div>
        <div>
          {dataLabel('karma')}
          {data(character.karma)}
        </div>
        <div>
          {dataLabel('total karma')}
          {data(character.totalKarma)}
        </div>
      </div>
    </div>
  )
}

function attributes () {
  const attributeStyle = {
    textAlign: 'center',
    width: '4rem',
    height: '4rem',
    borderRadius: '2rem',
    background: 'rgba(167, 35, 26, 0.8)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 2rem 1rem 0'
  }
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: '10rem',
      left: '7rem',
      color: 'white',
      marginTop: '2rem',
      flexWrap: 'wrap',
      height: '65vh'
    }}>
      <div style={attributeStyle}>
        {dataLabel('bod')}
        {data(character.attributes.body, true)}
      </div>
      <div style={attributeStyle}>
        {dataLabel('agi')}
        {data(character.attributes.agility, true)}
      </div>
      <div style={attributeStyle}>
        {dataLabel('rea')}
        {data(character.attributes.reaction, true)}
      </div>
      <div style={attributeStyle}>
        {dataLabel('str')}
        {data(character.attributes.strength, true)}
      </div>
      <div style={attributeStyle}>
        {dataLabel('wil')}
        {data(character.attributes.willpower, true)}
      </div>
      <div style={attributeStyle}>
        {dataLabel('log')}
        {data(character.attributes.logic, true)}
      </div>
      <div style={attributeStyle}>
        {dataLabel('int')}
        {data(character.attributes.intuition, true)}
      </div>
      <div style={attributeStyle}>
        {dataLabel('cha')}
        {data(character.attributes.charisma, true)}
      </div>
      <div>
        {dataLabel('essense')}
        {data(character.otherAttributes.essence)}
      </div>
      <div>
        {dataLabel('Magic/Resonance')}
        {data((character.otherAttributes as any)['Magic/Resonance'])}
      </div>
      <div>
        {dataLabel('initiative')}
        {data(character.otherAttributes.initiative)}
      </div>
      <div>
        {dataLabel('astral initiative')}
        {data(character.otherAttributes.astralInitiative)}
      </div>
      <div>
        {dataLabel('matrix initiative')}
        {data(character.otherAttributes.matrixInitiative)}
      </div>
      <div>
        {dataLabel('composure')}
        {data(character.otherAttributes.composure)}
      </div>
      <div>
        {dataLabel('judge intentions')}
        {data(character.otherAttributes.judgeIntentions)}
      </div>
      <div>
        {dataLabel('memory')}
        {data(character.otherAttributes.memory)}
      </div>
      <div>
        {dataLabel('lift/carry')}
        {data((character.otherAttributes as any)['Lift/Carry'])}
      </div>
      <div>
        {dataLabel('movement')}
        {data(character.otherAttributes.movement)}
      </div>
      <div style={{ marginTop: '1rem' }}>
        {dataLabel('edge')}
        <div style={{ display: 'flex', marginTop: '0.5rem' }}>
          {
            new Array(character.otherAttributes.edge).fill(null).map((thing, index) => {
              const dead = index < 2 ? true : false
              return <HexImage dead={dead} bold width='1.5rem' />
            })
          }
        </div>
      </div>
    </div>
  )
}

function qualities () {
  const karmaColumnStyle = {
    textAlign: 'center'
  }
  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      left: '7rem'
    }}>
      <table style={{
        tableLayout: 'fixed',
        borderCollapse: 'collapse'
      }}>
        <tr>
          <th style={{ borderBottom: '1px solid white' }}>Qualities</th>
        </tr>
        <tr>
          <td>Mild addiction (alcohol)</td>
        </tr>
        <tr>
          <td>Mild common allergy (hayfever)</td>
        </tr>
        <tr>
          <td>Weak immune system</td>
        </tr>
        <tr>
          <td>Exceptional attribute</td>
        </tr>
        <tr>
          <td>First impression</td>
        </tr>
      </table>
    </div>
  )
}

function activeSkills (close: JSX.EventHandler<MouseEvent>, open: JSX.EventHandler<MouseEvent>, modsVisible: boolean) {
  return (
    <div style={{
      position: 'absolute',
      top: '200px',
      left: '360px'
    }}>
      <table style={{
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        width: '300px'
      }}>
        <tr>
          <th style={{
            width: '250px'
          }}>
            <div style={{
              borderBottom: '2px solid rgb(167,35, 26)',
              height: '2rem',
              marginRight: '0.5rem'
            }}>
              SKILL
            </div>
          </th>
          <th style={{
            width: '100px'
          }}>
            <div style={{
              borderBottom: '2px solid rgb(167,35, 26)',
              height: '2rem',
              marginRight: '0.5rem'
            }}>
              ATTR
            </div>
          </th>
          <th style={{
            width: '100px'
          }}>
            <div style={{
              borderBottom: '2px solid rgb(167,35, 26)',
              height: '2rem',
              marginRight: '0.5rem'
            }}>
              RATING
            </div>
          </th>
        </tr>
        <tr style={{
          height: '2rem'
        }}>
          <td onClick={open}><Datum close={close} visible={modsVisible}>Negotiation</Datum></td>
          <th>CHA</th>
          <td>5</td>
        </tr>
        <tr style={{
          height: '2rem'
        }}>
          <td>Con</td>
          <th>CHA</th>
          <td>6</td>
        </tr>
        <tr style={{
          height: '2rem'
        }}>
          <td>Impersonation</td>
          <th>CHA</th>
          <td>6</td>
        </tr>
        <tr style={{
          height: '2rem'
        }}>
          <td>Etiquette</td>
          <th>CHA</th>
          <td>3</td>
        </tr>
        <tr style={{
          height: '2rem'
        }}>
          <td>Automatics (assault)</td>
          <th>AGI</th>
          <td>6</td>
        </tr>
        <tr style={{
          height: '2rem'
        }}>
          <td>Pistols</td>
          <th>AGI</th>
          <td>4</td>
        </tr>
        <tr style={{
          height: '2rem'
        }}>
          <td>Thrown Weapons</td>
          <th>AGI</th>
          <td>2</td>
        </tr>
      </table>
    </div>
  )
}

export default class Details2 extends Component<{}, { modsVisible: boolean }> {
  state = { modsVisible: false }

  close = (event: MouseEvent) => {
    this.setState({ modsVisible: false })
    event.stopPropagation()
  }

  open = () => {
    if (!this.state.modsVisible) {
      this.setState({ modsVisible: true })
    }
  }

  render () {
    return (
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        color: 'white',
        textAlign: 'left'
      }}>
        {showImage()}
        {showPersonalData()}
        {attributes()}
        {qualities()}
        {activeSkills(this.close, this.open, this.state.modsVisible)}
      </div>
    )
  }
}
