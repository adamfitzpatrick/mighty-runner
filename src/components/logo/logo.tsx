import { h } from 'preact'
import classnames from 'classnames'

import * as styles from './logo.scss'

interface Props {
  fill?: string
  stroke?: string
  header?: boolean
}

export default function Logo ({ fill, stroke, header }: Props) {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox='0 0 747 430'
        className={classnames(
          styles.logo,
          { [styles.header ]: header }
        )}
      >
        <g>
          <path
            style={{ stroke, fill }}
            className={styles.filledAndOutlined}
            d="M286.46 227.698c2.476 10.286 3.523 20-3.715 30.857l8.572-3.429c-3.524 12.667-12.762 18.19-13.143 31.143 3.143-4.952 5.571-7.62 8.571-9.714-7.952 11.571-5.762 33.428-8.857 42 3.19-3.382 5.238-3.334 7.43-6.286-3.049 6.38-2.668 11.618-4.858 18.285 2.952-1.81 4.19-4.762 6.285-7.143-1.714 7.524-1.285 16.048-5.143 22.571 4.143-.952 7-5.619 11.143-6.285-4.38 10.762.524 21.38 4.857 28.857 2.095-3.38 1.476-7.762 3.714-9.715.667 9 9.048 14.286 10.572 26.572 1.714-3.477 1-8.238 2.571-10.857 5.62 5.904 5.667 13.523 4.857 21.142 3.238-3.476 4.762-9.238 8-12.57 3.663 4.541 1.895 9.833 3.43 14.57 1.094-4.333 3.046-5.952 5.427-7.428 1.857 9 9.43 17.57 16.286 21.428-3.62-5.905-4.953-10.81-4-16 3.333 6.81 6.81 8.62 10.857 11.43-1.19-3.81-1.38-6.19-.572-8 5.286 3.427 7.143 11.856 12 15.427-.714-8.333 1.572-12.666 5.143-15.143 2.81 6.857.476 12.714 2.857 19.714 1.952-8.76 8.62-12.095 10.571-20.285 1.524 3.19.762 6.095 1.143 9.143 4.333-1.715 7.095-7.572 10.857-12 .238 4.905-.666 10.38-4.857 14 10.952-.905 14.048-12.81 18.286-20.857 1.142 3.62 3.428 5.238 5.428 7.428-.714-5.047.43-9.523 2.286-12.57 2.38 4.237 3.762 8.047 8 10.57-2.19-9.333 1.904-13.523 2.857-20.285 2.38 4.62 3.476 8.952 5.857 13.428-1.143-12.952 8.428-19.619 9.857-30.285 1.857 4.762 3.286 10.238 3.428 15.143 5.138-8.713 6.381-19.927 5.715-31.429 3.857 3.667 7.428 2.476 11.142 3.715-6.57-9.048-5.57-19.095-6.857-28.857l7.715 12c1.197-9.483-3.227-19.913-3.112-29.24.116-9.352-2.104-16.78-4.603-21.33 4.096 2.046 6.476 6.665 9.714 10-.238-10.954-10.76-21.049-11.428-31.144 2.62 1.572 4.524 4.286 7.714 4.43-8.238-10.19-5.333-28.38-6.57-35l-175.427 2z"
          />
          <path
            style={{ fill, stroke }}
            className={styles.filledAndOutlined}
            d="M328.194 56.683c16.41-5.973 64.132-9.206 90.892 1.665 43.307 17.594 54.33 45.04 55.327 73.677.476 13.68-3.455 27.895-5.469 37.557 7.32 12.604 8.066 22.637 1.385 33.527l.39 9.445-5.285 13.48-23.229 7.116c-13.345-7.547-22.119-3.094-26.32 11.644l-85.063-.755c-.369-8.203-9.023-19.834-23.39-9.18l-25.592-7.372-6.5-13.658 2.26-10.145c-5.36-11.11-5.578-21.937 1.92-31.62-2.95-13.948-8.066-31.594-8.278-44.128-.73-43.18 43.595-66.39 56.952-71.253z"
          />
          <path
            style={{ fill: stroke }}
            className={styles.filled}
            d="M370.744 176.613s-15.734 33.217-15.428 37.714c.324 4.765 6.271 14.283 8.571 14.857 2.691.671 8-2.286 8-2.286l3.43-12 5.141 11.43s5.557 2.276 8 1.142c2.397-1.113 6.847-10.347 6.857-13.143.02-5.723-17.142-38.857-17.142-38.857l-3.429 3.43zm-25.142-15.77c-47.23-30.076-50.89 14.045-37.143 22.856 10.821 6.934 25.524 3.047 38.285 4.571l17.715-22.285c-6.286-1.715-13.362-1.644-18.857-5.143zm58.15.57c47.228-30.075 50.89 14.047 37.141 22.857-10.82 6.935-25.523 3.048-38.285 4.572l-17.714-22.286c6.286-1.714 13.361-1.643 18.857-5.143z"
          />
          <path
            style={{ fill, stroke }}
            className={styles.filledAndOutlined}
            d="M308.174 243.412s-20.47 19.683 1.142 30.857c28.38 14.672 64.571-9.428 64.571-9.428s39.043 23.83 63.142 10c23.897-13.714 5.43-31.429 5.43-31.429s-2.85 24.22-19.715 8.286c-29.999-28.344-48.286-10.286-48.286-10.286s-17.62-17.658-49.428 10c-18.499 16.087-16.856-8-16.856-8z"
          />
          <path
            style={{ fill: stroke }}
            className={styles.filled}
            d="M371.744 271.27c-2.952 2.047-6.047 3.666-10.143 5.285.55 2.95.78 6.35 1.63 8.38.791 1.885 8.067 1.43 8.942.62 1.761-1.633.904-9.143-.429-14.286zm4.59.285c3.285 2.047 7.428 3.952 10.856 5.428-.542 2.914-.333 5.853-1.17 7.878-.797 1.927-9.252.724-9.544-.45-1.047-4.203-1.762-7.713-.143-12.856zm-29.735 21.963c2.584-3.685-1.835-47.49-4.144-47.57-3.619-.129-9.063 28.158-9.857 39.856-.276 4.074 11.087 7.843 14 7.714zm28.071 5.235l11.785-1.558c-.708-4.129-.793-5.83-1.737-7.13-.588-.81-8.674-1.065-9.19.464-.806 2.376-.86.96-.858 8.224zm-1.644-.142l-11.784-1.559c.707-4.129.792-5.83 1.736-7.13.588-.81 8.674-1.065 9.192.464.804 2.376.86.96.856 8.225zm-13.282-21.342c-3.666 1.762-6.619 2.38-10.714 4 .55 2.95.55 3.705 1.202 5.81.362 1.17 9.351.144 9.94-.667 1.413-1.943.191-3.715-.428-9.143zm28.94 0c3.666 1.762 6.62 2.38 10.714 4-.55 2.95-.55 3.705-1.202 5.81-.362 1.17-9.35.144-9.94-.667-1.413-1.943-.19-3.715.428-9.143zm-29.086 19.342l-10.785-1.987c.708-4.13.078-3.403 1.022-4.702.59-.81 8.675-1.065 9.192.464.804 2.376.574-1.04.57 6.225zm28.534.285l10.784-1.987c-.708-4.128-.078-3.402-1.022-4.7-.588-.81-8.674-1.066-9.192.463-.804 2.376-.574-1.04-.57 6.224zm13.247-3.092c-2.585-3.685 1.834-47.49 4.143-47.57 3.62-.129 9.064 28.158 9.857 39.856.276 4.073-11.087 7.843-14 7.714z"
          />
          <path
            style={{ fill, stroke }}
            className={styles.filledAndOutlined}
            d="M336.913 69.847c-105.866-86.098-133.817-89.376-180.177-.24-28.11 54.047-43.08 119.37-73.603 148.475-15.312 14.603-44.986 17.847-61.714 14.857-23.892-4.27-24.948 3.335 3.833 14.245 59.823 22.677 92.52 8.488 132.64-46.118 19.534-26.588 31.724-46.963 49.81-80.126 5.897-10.81 14.023-29.495 20.24-31.778 19.381 14.19 38.31 29.24 56.066 42.4 16.064 11.903 65.13-51.772 52.905-61.715zm74.266 1.616c105.867-86.098 133.817-89.376 180.177-.24 28.11 54.047 43.082 119.37 73.603 148.475 15.313 14.603 44.986 17.847 61.714 14.857 23.892-4.27 24.95 3.335-3.833 14.245-59.822 22.677-92.52 8.49-132.639-46.118-19.534-26.588-31.724-46.963-49.812-80.125-5.896-10.81-14.022-29.496-20.238-31.779-19.382 14.19-38.31 29.24-56.067 42.4-16.063 11.904-65.13-51.77-52.905-61.715z"
          />
        </g>
      </svg>
  )
}

