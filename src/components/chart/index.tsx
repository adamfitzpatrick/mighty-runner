import { h } from 'preact'

import { AttributeList, Attributes } from '@assets/models'

const attributeLabels: { [key in Attributes]: string } = {
  body: 'B',
  agility: 'A',
  reaction: 'R',
  strength: 'S',
  willpower: 'W',
  logic: 'L',
  intuition: 'I',
  charisma: 'C'
}

import * as styles from './chart.scss'

interface ChartProps {
  attributes: AttributeList
}

export default function Chart ({ attributes }: ChartProps) {
  const maxVal = Object.keys(attributes).reduce((running: number, key: Attributes) => {
    return Math.max(attributes[key], running)
  }, 0)


  function getDataPoint (key: Attributes): JSX.Element {
    /*`calc(${attributes[key] / maxVal} * ${MIN_CHART_HEIGHT} - 1rem)` }}/>*/
    return (
      <div className={styles.dataPoint} key={key}>
        <div className={styles.label}>{ attributeLabels[key] }</div>
        <div className={styles.bar} style={{ height: `calc(${attributes[key] / maxVal * 100}% - 1rem)` }} />
      </div>
    )
  }

  return (
    <div className={styles.chart}>
      {Object.keys(attributes).map(getDataPoint)}
    </div>
  )
}
