import { h } from 'preact'

import { CharacterModel } from '@assets/models'

import CharacterCard from '@components/character-card'

import * as styles from './character-list.scss'

import * as flynn from '@assets/images/melodium_flynn.png'
import * as gorvesh from '@assets/images/gorvesh_divaughn.jpg'
import * as lido from '@assets/images/lido_corvam.jpg'
import * as murain from '@assets/images/murain_kilpatrick.jpg'

const characters: CharacterModel[] = [{
  id: '1',
  name: 'Melodium Flynn',
  metatype: 'Dwarf',
  brief: 'Infiltrator',
  imageUrl: flynn,
  description: '',
  attributes: {
    body: 5,
    agility: 6,
    reaction: 5,
    strength: 3,
    willpower: 3,
    logic: 3,
    intuition: 5,
    charisma: 7
  }
}, {
  id: '2',
  name: 'Gorvesh Divaughn',
  metatype: 'Troll',
  brief: 'Tank',
  imageUrl: gorvesh,
  description: '',
  attributes: {
    body: 7,
    agility: 4,
    reaction: 5,
    strength: 8,
    willpower: 2,
    logic: 1,
    intuition: 3,
    charisma: 3
  }
}, {
  id: '3',
  name: 'Lido Corvam',
  metatype: 'Human',
  brief: 'Shaman',
  imageUrl: lido,
  description: '',
  attributes: {
    body: 2,
    agility: 3,
    reaction: 4,
    strength: 1,
    willpower: 7,
    logic: 6,
    intuition: 5,
    charisma: 2
  }
}, {
  id: '4',
  name: 'Murain Kilpatrick',
  metatype: 'Elf',
  brief: 'Decker',
  imageUrl: murain,
  description: '',
  attributes: {
    body: 3,
    agility: 4,
    reaction: 3,
    strength: 3,
    willpower: 6,
    logic: 7,
    intuition: 6,
    charisma: 2
  }
}]

export default function CharacterList () {
  return (
    <div className={styles.characterList}>
      <CharacterCard character={characters[0]} />
      <CharacterCard character={characters[1]} />
      <CharacterCard character={characters[2]} />
      <CharacterCard character={characters[3]} />
    </div>
  )
}
