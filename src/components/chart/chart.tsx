import * as React from 'react'
import classnames from 'classnames'

import * as styles from './chart.scss'

export type DataPoint = [string, number]

interface ChartProps {
  data: DataPoint[]
  bare?: boolean
}

interface ChartState {
  ready: boolean
}

export default function Chart ({ data, bare }: ChartProps) {
  let maxVal: number = data.reduce((running: number, datum: DataPoint) => {
    return Math.max(datum[1], running)
  }, 0)
  let [state, setState ] = React.useState<ChartState>({ ready: false })
  let chartElement: HTMLElement

  function getDataPoint (point: DataPoint, index: number) {
    // Using the index as key is acceptable because this is a view-only component
    // which does not manipulate the source data in any way.
    return (
      <div className={styles.dataPoint} key={index}>
        <div className={styles.label}>{ point[0] }</div>
        <div className={styles.bar} style={{ height: `calc(${point[1] / maxVal * 100}% - 1rem)` }}/>
      </div>
    )
  }

  return (
    <div className={classnames(
      styles.chart,
      { [styles.bare]: bare }
    )}>
      { data.map(getDataPoint) }
    </div>
  )
}
