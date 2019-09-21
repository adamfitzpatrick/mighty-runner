import { Stat } from './stat'

export interface GearItem extends Stat {
  cost: number
  availability: string
  value: {
    rating: number
  }
}
