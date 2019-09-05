import { Character } from '@models'

export interface AppState {
  characters: Character[]
  activeCharacter: Character
}

const character = {
  'userId': '5ZBbOZJtFNs2esIVciyJ',
  'id': '1',
  'name': 'Character',
  'attributes': {
    'agility': {
      'name': 'Agility',
      'maximum': 6,
      'asTarget': ['attributes','agility'],
      'shortName': 'agi',
      'value': {
        'initial': 1,
        'chargen': 5
      }
    }
  },
  'specialAttributes': {},
  'effects': [{
    'name': 'Effect 1',
    'active': true,
    'id': '1',
    'value': 1,
    'target': ['attributes','agility']
  },{
    'name': 'Effect 2',
    'active': false,
    'id': '2',
    'value': 145,
    'target': ['target','1']
  }]
} as Character

const characters: Character[] = [ character ]

const initialState: AppState = {
  characters,
  activeCharacter: character
}

export default initialState
