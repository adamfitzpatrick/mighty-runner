import { h } from 'preact'
import { CharacterModel } from '@assets/models'

const characters = [
  {
    'id': '1',
    'name': 'Melodium Flynn',
    'metatype': 'Dwarf',
    'ethnicity': 'Irish',
    age: 23,
    sex: 'M',
    height: '4\' 3"',
    weight: '180lbs',
    streetCred: '8',
    notoriety: '1',
    publicAwareness: '2',
    karma: '16',
    totalKarma: '172',
    'role': 'Infiltrator face with a penchant for shooting things',
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
      'essense': 3.8,
      'edge': 5
    }
  }, {
    'id': '2',
    'name': 'Gorvesh Divaughn',
    'metatype': 'Troll',
    'role': 'Tank',
    'image': {
      'url': 'https://s3-us-west-2.amazonaws.com/mighty-runner-image-share/gorvesh_divaughn.jpg',
      'thumbnailTransform': {
        'x': 0,
        'y': 0
      }
    },
    'description': '',
    'attributes': {
      'body': 7,
      'agility': 4,
      'reaction': 5,
      'strength': 8,
      'willpower': 2,
      'logic': 1,
      'intuition': 3,
      'charisma': 3
    },
    'otherAttributes': {
      'essense': 3.8,
      'edge': 5
    }
  }, {
    'id': '3',
    'name': 'Lido Corvam',
    'metatype': 'Human',
    'role': 'Shaman',
    'image': {
      'url': 'https://s3-us-west-2.amazonaws.com/mighty-runner-image-share/lido_corvam.jpg',
      'thumbnailTransform': {
        'x': -40,
        'y': 0,
        'scale': 2.5
      }
    },
    'description': '',
    'attributes': {
      'body': 2,
      'agility': 3,
      'reaction': 4,
      'strength': 1,
      'willpower': 7,
      'logic': 6,
      'intuition': 5,
      'charisma': 2
    },
    'otherAttributes': {
      'essense': 3.8,
      'edge': 5
    }
  }, {
    'id': '4',
    'name': 'Murain Kilpatrick',
    'metatype': 'Elf',
    'role': 'Decker',
    'image': {
      'url': 'https://s3-us-west-2.amazonaws.com/mighty-runner-image-share/murain_kilpatrick.jpg',
      'thumbnailTransform': {
        'x': 0,
        'y': 0
      }
    },
    'description': '',
    'attributes': {
      'body': 3,
      'agility': 4,
      'reaction': 3,
      'strength': 3,
      'willpower': 6,
      'logic': 7,
      'intuition': 6,
      'charisma': 2
    },
    'otherAttributes': {
      'essense': 3.8,
      'edge': 5
    }
  }, {
    'id': '5',
    'name': 'Plan9',
    'metatype': 'Human',
    'role': 'Face',
    'image': {
      'url': 'https://s3-us-west-2.amazonaws.com/mighty-runner-image-share/gorvesh_divaughn.jpg',
      'thumbnailTransform': {
        'x': 0,
        'y': 0
      }
    },
    'description': '',
    'attributes': {
      'body': 3,
      'agility': 4,
      'reaction': 3,
      'strength': 3,
      'willpower': 6,
      'logic': 7,
      'intuition': 6,
      'charisma': 2
    },
    'otherAttributes': {
      'essense': 3.8,
      'edge': 5
    }
  }
]

interface Props {
  path?: string,
  id?: string
}

function showImage (character: CharacterModel) {
  return (
    <svg
      viewBox='0 0 100 100'
      style={{
        position: 'fixed',
        width: '50vh',
        height: '50vh',
        bottom: 0,
        left: 0
      }}
    >
      <defs>
        <path
          id='arc'
          d='M0,0 L0,100 100,100 A 100 100 0 0 0 0,0 z'
          stroke='#ffffff'
        />
        <path
          id='inner-arc'
          d='M-10,-10 L110,0 L110,100 L97,100 A 97 97 0 0 0 0,3 z'
        />
        <clipPath id='arc-clip-path'>
          <use xlinkHref='#arc' />
        </clipPath>
        <filter
          id='drop-behind'
        >
          <feGaussianBlur
            in='SourceGraphic'
            stdDeviation='4'
            result='blur'
            id='drop-behind-blur'
          />
          <feOffset
            in='blur'
            dx='-5'
            dy='5'
            result='offset'
            id='drop-behind-offset'
          />
        </filter>
      </defs>
      <image
        xlinkHref={character.image.url}
        width='100'
        clip-path='url(#arc-clip-path)'
      />
      <use
        xlinkHref='#inner-arc'
        fill='#000000'
        stroke='none'
        filter='url(#drop-behind)'
        clip-path='url(#arc-clip-path)'
      />
    </svg>
  )
}

function renderInput (property: string, character: CharacterModel, hideLabel?: boolean, editing?: boolean, customStyle?: object) {
  const label = property.replace(/([A-Z])/g, ' $1')
  const characterIndex: {
    [prop: string]: string
  } = character as any
  const inputStyle = Object.assign({
    '--webkit-appearance': 'none',
    background: 'none',
    border: '0',
    color: 'white',
    fontSize: '1rem',
    fontFamily: 'Lato, sans-serif',
    fontWeight: hideLabel && !editing ? '300' : '400',
    borderBottom: '1px solid transparent',
    borderBottomColor: editing ? 'white' : 'transparent',
    height: '1.5rem',
    display: 'block',
    marginRight: '1rem',
    width: 'calc(100% - 1rem)'
  }, customStyle || {})
  return (
    <label
      style={{
        textTransform: 'uppercase',
        fontSize: '0.6rem',
        color: hideLabel && !editing ? 'transparent' : '#ddd',
        flexGrow: '1'
      }}
    >
      {label}
      <input
        style={inputStyle}
        type='text'
        value={characterIndex[property]}
      />
    </label>
  )
}

function showPersonalData (character: CharacterModel) {
  return (
    <div style={{
      position: 'absolute',
      color: 'white',
      top: '8rem',
      left: '7rem',
      width: '25vw'
    }}>
      {renderInput('role', character, true, false, { width: '50vw', marginBottom: '1rem' })}
      <div style={{
        padding: '1rem 0 1rem 1rem',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '0.25rem'
      }}>
        <div style={{
          display: 'flex',
          marginBottom: '1rem'
        }}>
          {renderInput('metatype', character)}
          {renderInput('ethnicity', character)}
        </div>
        <div style={{
          display: 'flex',
          marginTop: '1rem'
        }}>
          {renderInput('age', character)}
          {renderInput('sex', character)}
          {renderInput('height', character)}
          {renderInput('weight', character)}
        </div>
        <div style={{
          display: 'flex',
          marginTop: '1rem'
        }}>
          {renderInput('streetCred', character, false)}
          {renderInput('notoriety', character)}
          {renderInput('publicAwareness', character)}
        </div>
        <div style={{
          display: 'flex',
          marginTop: '1rem'
        }}>
          {renderInput('karma', character, false)}
          {renderInput('totalKarma', character)}
        </div>
      </div>
    </div>
  )
}

export default function (props: Props) {
  const id = parseInt(props.id!, 10)
  const character = characters[id - 1] as any as CharacterModel
  return (
    <div style={{
      position: 'absolute'
    }}>
      {showImage(character)}
      {showPersonalData(character)}
    </div>
  )
}
