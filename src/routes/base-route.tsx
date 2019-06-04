import { h } from 'preact'
import { route } from 'preact-router'
import HexImage from '@components/hex-image'
import Chart from '@components/chart';

const characters = [
  {
  "id": "1",
  "name": "Melodium Flynn",
  "metatype": "Dwarf",
  "brief": "Infiltrator",
  "image": {
  "url": "https://s3-us-west-2.amazonaws.com/mighty-runner-image-share/melodium_flynn.png",
  "thumbnailTransform": {
  "x": 0,
  "y": 0
  }
  },
  "description": "A compelling personality despite his short stature, Flynn leverages his dwarven qualities so as to be overlooked as a threat as he sweet-talks his victims out of the things they least desire to part with.",
  "attributes": {
  "body": 5,
  "agility": 6,
  "reaction": 5,
  "strength": 3,
  "willpower": 3,
  "logic": 3,
  "intuition": 5,
  "charisma": 7
  },
  'otherAttributes': {
    'essense': 3.8,
    "edge": 5
  }
  },
  {
  "id": "2",
  "name": "Gorvesh Divaughn",
  "metatype": "Troll",
  "brief": "Tank",
  "image": {
  "url": "https://s3-us-west-2.amazonaws.com/mighty-runner-image-share/gorvesh_divaughn.jpg",
  "thumbnailTransform": {
  "x": 0,
  "y": 0
  }
  },
  "description": "",
  "attributes": {
  "body": 7,
  "agility": 4,
  "reaction": 5,
  "strength": 8,
  "willpower": 2,
  "logic": 1,
  "intuition": 3,
  "charisma": 3
  },
  'otherAttributes': {
    'essense': 3.8,
    "edge": 5
  }
  },
  {
  "id": "3",
  "name": "Lido Corvam",
  "metatype": "Human",
  "brief": "Shaman",
  "image": {
  "url": "https://s3-us-west-2.amazonaws.com/mighty-runner-image-share/lido_corvam.jpg",
  "thumbnailTransform": {
  "x": -40,
  "y": 0,
  "scale": 2.5
  }
  },
  "description": "",
  "attributes": {
  "body": 2,
  "agility": 3,
  "reaction": 4,
  "strength": 1,
  "willpower": 7,
  "logic": 6,
  "intuition": 5,
  "charisma": 2
  },
  'otherAttributes': {
    'essense': 3.8,
    "edge": 5
  }
  },
  {
  "id": "4",
  "name": "Murain Kilpatrick",
  "metatype": "Elf",
  "brief": "Decker",
  "image": {
  "url": "https://s3-us-west-2.amazonaws.com/mighty-runner-image-share/murain_kilpatrick.jpg",
  "thumbnailTransform": {
  "x": 0,
  "y": 0
  }
  },
  "description": "",
  "attributes": {
  "body": 3,
  "agility": 4,
  "reaction": 3,
  "strength": 3,
  "willpower": 6,
  "logic": 7,
  "intuition": 6,
  "charisma": 2
  },
  'otherAttributes': {
    'essense': 3.8,
    "edge": 5
  }
  },
  {
  "id": "5",
  "name": "Plan9",
  "metatype": "Human",
  "brief": "Face",
  "image": {
  "url": "https://s3-us-west-2.amazonaws.com/mighty-runner-image-share/gorvesh_divaughn.jpg",
  "thumbnailTransform": {
  "x": 0,
  "y": 0
  }
  },
  "description": "",
  "attributes": {
  "body": 3,
  "agility": 4,
  "reaction": 3,
  "strength": 3,
  "willpower": 6,
  "logic": 7,
  "intuition": 6,
  "charisma": 2
  },
  'otherAttributes': {
    'essense': 3.8,
    "edge": 5
  }
  }
  ]

interface Props {
  path: string
}

function addButton () {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '6rem',
        left: '16rem',
        fontSize: '3rem',
        background: '#a7231a',
        borderRadius: '50%',
        width: '4rem',
        height: '4rem',
        textAlign: 'center',
        lineHeight: '4rem',
        color: 'white'
      }}
    >
      +
    </div>
  )
}

function oldStats () {
  return (
    <div
      style={{
        position: 'fixed',
        marginLeft: '3rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '15rem',
        borderRight: '1px solid grey',
        color: 'white',
        height: '100vh'
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '4rem', marginRight: '1rem', textAlign: 'right' }}>16</div>
        <div style={{}}>characters</div>
        <div style={{ borderBottom: '5px solid #a7321a', gridArea: 'auto / auto / auto / span 4', margin: '1rem 0' }}></div>
        <div style={{ fontSize: '2rem', marginRight: '1rem', textAlign: 'right' }}>4</div>
        <div>trolls</div>
        <div style={{ fontSize: '2rem', marginRight: '1rem', textAlign: 'right' }}>2</div>
        <div>dwarves</div>
        <div style={{ fontSize: '2rem', marginRight: '1rem', textAlign: 'right' }}>6</div>
        <div>humans</div>
        <div style={{ fontSize: '2rem', marginRight: '1rem', textAlign: 'right' }}>4</div>
        <div>elves</div>
        <div style={{ borderBottom: '5px solid #a7321a', gridArea: 'auto / auto / auto / span 4', margin: '1rem 0' }}></div>
        <div style={{ fontSize: '2rem', marginRight: '1rem', textAlign: 'right' }}>9</div>
        <div>awakened</div>
        <div style={{ fontSize: '2rem', marginRight: '1rem', textAlign: 'right' }}>7</div>
        <div>mundane</div>
      </div>
    </div>
  )
}

function stats () {
  return (
    <div
      style={{
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '18rem',
        borderRight: '1px solid grey',
        color: 'white',
        height: '100vh'
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '4rem', marginRight: '1rem', textAlign: 'right' }}>16</div>
        <div style={{}}>characters</div>
        <div style={{ borderBottom: '5px solid #a7321a', gridArea: 'auto / auto / auto / span 4', margin: '1rem 0' }}></div>
        <div style={{ gridArea: 'auto / auto / auto / span 4', fontSize: '0.5rem', marginTop: '2rem' }}>FAVORITE</div>
        <div style={{ gridArea: 'auto / auto / auto / span 4', textAlign: 'right' }}>Melodium Flynn</div>
        <div style={{ gridArea: 'auto / auto / auto / span 4', fontSize: '0.5rem', marginTop: '2rem' }}>NEWEST</div>
        <div style={{ gridArea: 'auto / auto / auto / span 4', textAlign: 'right' }}>Three Fathoms Down</div>
      </div>
    </div>
  )
}

function viewDetail (id: string) {
  return () => route(`/detail/${id}`)
}

function character (character: any, damage?: boolean, dead?: boolean) {
  return (
    <div style={{
      padding: '10rem 3rem 0',
      width: '25rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRight: '1px solid grey',
      height: '100vh',
      flexShrink: '0',
      color: 'white',
      boxSizing: 'border-box'
    }}
      onClick={viewDetail(character.id)}
    >
      <div style={{
        width: '8rem'
      }}>
        <HexImage image={character.image} dead={dead} />
      </div>
      <div style={{
        width: '100%'
      }}>
        <h3 style={{ marginBottom: '0', fontSize: '0.7rem' }}>{character.metatype} {character.brief}</h3>
        <h2 style={{ marginTop: '0' }}>{character.name}</h2>
      </div>
      <div style={{
        height: '10rem',
        display: 'flex',
        width: '19rem',
        marginTop: '1rem'
      }}>
        <Chart attributes={character.attributes} />
      </div>
      <div style={{
        display: 'block',
        backgroundColor: '#ffffff11',
        marginTop: '1rem',
        padding: '1rem',
        width: '19rem',
        boxSizing: 'border-box',
        borderRadius: '0.5rem',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          position: 'relative'
        }}>
          {
            damage ?
            <div style={{
              position: 'absolute',
              background: 'rgba(167, 35, 26, 0.9)',
              width: '1.8rem',
              height: '1.8rem',
              lineHeight: '1.8rem',
              fontSize: '1.25rem',
              top: '7.9rem',
              left: '3.3rem',
              borderRadius: '4px'
            }}>7</div> :
            null
            }
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem', gridArea: 'auto / auto / auto / span 2' }}>5</div>
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem', gridArea: 'auto / auto / auto / span 2' }}>3.8</div>
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem', gridArea: 'auto / auto / auto / span 2' }}>0</div>
          <div style={{ marginBottom: '1rem', fontSize: '0.5rem', textTransform: 'uppercase', gridArea: 'auto / auto / auto / span 2' }}>Edge</div>
          <div style={{ marginBottom: '1rem', fontSize: '0.5rem', textTransform: 'uppercase', gridArea: 'auto / auto / auto / span 2' }}>Essense</div>
          <div style={{ marginBottom: '1rem', fontSize: '0.5rem', textTransform: 'uppercase', gridArea: 'auto / auto / auto / span 2' }}>M/R</div>
          <div style={{ gridArea: 'auto / auto / auto / span 6', display: 'flex', alignItems: 'center' }}>
            <div style={{ borderBottom: '1px solid white', flexGrow: '1' }}></div>
            <div style={{ margin: '0 1rem', fontSize: '0.5rem' }}>LIMITS</div>
            <div style={{ borderBottom: '1px solid white', flexGrow: '1' }}></div>
          </div>
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem', gridArea: 'auto / auto / auto / span 2' }}>7</div>
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem', gridArea: 'auto / auto / auto / span 2' }}>6</div>
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem', gridArea: 'auto / auto / auto / span 2' }}>9</div>
          <div style={{ marginBottom: '1rem', fontSize: '0.5rem', textTransform: 'uppercase', gridArea: 'auto / auto / auto / span 2' }}>Physical</div>
          <div style={{ marginBottom: '1rem', fontSize: '0.5rem', textTransform: 'uppercase', gridArea: 'auto / auto / auto / span 2' }}>mental</div>
          <div style={{ fontSize: '0.5rem', textTransform: 'uppercase', gridArea: 'auto / auto / auto / span 2' }}>social</div>
          <div style={{ gridArea: 'auto / auto / auto / span 6', display: 'flex', alignItems: 'center' }}>
            <div style={{ borderBottom: '1px solid white', flexGrow: '1' }}></div>
            <div style={{ margin: '0 1rem', fontSize: '0.5rem' }}>CONDITION</div>
            <div style={{ borderBottom: '1px solid white', flexGrow: '1' }}></div>
          </div>
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem', gridArea: 'auto / auto / auto / span 3' }}>11</div>
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem', gridArea: 'auto / auto / auto / span 3' }}>10</div>
          <div style={{ marginBottom: '1rem', fontSize: '0.5rem', textTransform: 'uppercase', gridArea: 'auto / auto / auto / span 3' }}>Physical</div>
          <div style={{ marginBottom: '1rem', fontSize: '0.5rem', textTransform: 'uppercase', gridArea: 'auto / auto / auto / span 3' }}>Stun</div>
        </div>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        backgroundColor: '#ffffff11',
        marginTop: '1rem',
        padding: '1rem',
        width: '19rem',
        boxSizing: 'border-box',
        borderRadius: '0.5rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>22</div>
        <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>119</div>
        <div style={{ marginBottom: '1rem', fontSize: '0.5rem', textTransform: 'uppercase' }}>Karma</div>
        <div style={{ marginBottom: '1rem', fontSize: '0.5rem', textTransform: 'uppercase' }}>Lifetime Karma</div>
        <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>&#xa5;110,000</div>
        <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Squatter</div>
        <div style={{ fontSize: '0.5rem', textTransform: 'uppercase' }}>Nuyen</div>
        <div style={{ fontSize: '0.5rem', textTransform: 'uppercase' }}>Lifestyle</div>
      </div>
    </div>
  )
}

function characterList () {
  return (
    <div style={{
      position: 'fixed',
      overflowY: 'hidden',
      overflowX: 'auto',
      width: 'calc(100vw - 18rem)',
      height: '100vh',
      left: '18rem',
      top: '0',
      display: 'flex'
    }}>
      {character(characters[0])}
      {character(characters[1], true)}
      {character(characters[2], false, true)}
      {character(characters[3])}
      {character(characters[4])}
    </div>
  )
}

export default function BaseRoute (props: Props) {
  return (
    <div>
      {stats()}
      {addButton()}
      {characterList()}
    </div>
  )
}
