import { h } from 'preact'
import Match from 'preact-router/match'
import classnames from 'classnames'

import * as styles from './logo.scss'

interface MatchParams {
  matches: boolean,
  path: string
}

interface Props {
  fill?: string
  stroke?: string
  header?: boolean
}

const headerPathBases = [
  '/characters',
  '/character-detail'
]

function showAsHeader (path: string) {
  return headerPathBases.some(pathBase => {
    return path.search(pathBase) > -1
  })
}

function renderLogo (header: boolean, stroke?: string, fill?: string) {
  stroke = stroke || 'ffffff'
  fill = fill || 'a7231a'
  return (
    <div className={styles.logo}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 430 430'
        className={styles.skull}
      >
        <g style='fill-rule:evenodd'>
          <path
            style={{ stroke, fill }}
            d='M178.422 119.931c16.41-5.973 64.132-9.206 90.892 1.665 43.307 17.594 54.33 45.04 55.327 73.677.476 13.68-3.455 27.895-5.47 37.557 7.32 12.604 8.067 22.637 1.386 33.527l.39 9.445-5.285 13.48-23.23 7.116c-13.344-7.547-23.79-3.094-27.992 11.644-14.42-9.041-27.725-15.574-39.914-2.041-6.41-8.49-25.64-10.29-42.64 2.958-.37-8.203-9.86-21.506-24.227-10.852l-25.591-7.372-6.5-13.658 2.259-10.145c-5.36-11.11-5.577-21.937 1.92-31.62-2.95-13.948-8.065-31.594-8.277-44.128-.73-43.18 43.595-66.39 56.952-71.253z'
          />
          <path
            style={{ fill: stroke }}
            d='M220.972 233.861s-15.734 33.217-15.428 37.714c.324 4.765 6.27 14.283 8.57 14.857 2.692.671 8-2.286 8-2.286l3.43-12 5.142 11.43s5.557 2.276 8 1.142c2.397-1.113 6.847-10.347 6.857-13.143.02-5.723-17.142-38.857-17.142-38.857l-3.43 3.43zm-25.142-15.77c-47.23-30.076-50.89 14.045-37.143 22.856 10.82 6.934 25.524 3.047 38.285 4.571l17.715-22.285c-6.286-1.715-13.362-1.644-18.857-5.143zm58.149.57c47.229-30.075 50.89 14.047 37.142 22.857-10.82 6.935-25.523 3.048-38.285 4.572l-17.714-22.286c6.286-1.714 13.36-1.643 18.857-5.143z'
          />
          <path
            style={{ stroke, fill }}
            d='M158.402 306.66s-20.47 19.683 1.142 30.857c28.38 14.672 64.57-9.428 64.57-9.428s39.044 23.83 63.143 10c23.897-13.714 5.429-31.429 5.429-31.429s-2.85 24.22-19.714 8.286c-30-28.344-48.286-10.286-48.286-10.286s-17.621-17.658-49.428 10c-18.5 16.087-16.856-8-16.856-8z'
          />
        </g>
      </svg>
    </div>
  )
}

export default function Logo ({ fill, stroke }: Props) {
  return (
    <Match>
      { ({ path }: MatchParams) => renderLogo(showAsHeader(path), stroke, fill) }
    </Match>
  )
}

