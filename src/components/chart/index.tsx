import { h } from 'preact'

const attributeLabels: { [key: string]: string } = {
  body: 'B',
  agility: 'A',
  reaction: 'R',
  strength: 'S',
  willpower: 'W',
  logic: 'L',
  intuition: 'I',
  charisma: 'C'
}

const attributes: { [key: string]: number } = {
  body: 5,
  agility: 6,
  reaction: 5,
  strength: 3,
  willpower: 3,
  logic: 3,
  intuition: 5,
  charisma: 7
}

import * as styles from './chart.scss'


export default function Chart () {
  const maxVal = Object.keys(attributes).reduce((running: number, key: string) => {
    return Math.max(attributes[key], running)
  }, 0)


  function getDataPoint (key: string): JSX.Element {
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
