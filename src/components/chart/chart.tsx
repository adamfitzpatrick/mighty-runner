import { h, Component } from 'preact'

import { AttributeList, Attribute } from '@assets/models'

const attributeLabels: { [key in Attribute]: string } = {
  body: 'BOD',
  agility: 'AGI',
  reaction: 'REA',
  strength: 'STR',
  willpower: 'WIL',
  logic: 'LOG',
  intuition: 'INT',
  charisma: 'CHA'
}

import * as styles from './chart.scss'

interface Props {
  attributes: AttributeList
}

interface State {
  ready: boolean
}

export default class Chart extends Component<Props> {
  maxVal: number
  state = {
    ready: false
  }
  chartElement: HTMLElement

  render ({ attributes }: Props) {
    this.maxVal = Object.keys(attributes).reduce((running: number, key: Attribute) => {
      return Math.max(attributes[key], running)
    }, 0)

    return (
      <div className={styles.chart}>
        { Object.keys(attributes).map(this.getDataPoint) }
      </div>
    )
  }

  private getDataPoint = (key: Attribute): JSX.Element => {
    return (
      <div className={styles.dataPoint} key={key}>
        <div className={styles.label}>{ attributeLabels[key] }</div>
        <div className={styles.bar} style={{ height: `calc(${this.props.attributes[key] / this.maxVal * 100}% - 1rem)` }}/>
      </div>
    )
  }
}
