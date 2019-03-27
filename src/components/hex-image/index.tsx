import { h } from 'preact'

import * as styles from './hex-image.scss'

export interface HexImageProps {
  showGradient?: boolean
  image?: string
  center?: boolean
}

function renderImage (image: string) {
  if (image) {
    return <image xlinkHref={image} width={100} height={131} clip-path='url(#hex-clip-path)' />
  }
  return null
}

function renderGradient (showGradient: boolean) {
  if (showGradient) {
    return  <use xlinkHref='#hex' fill='url(#gradient)' />
  }
  return null
}

export default function HexImage (props: HexImageProps) {
  const style = props.center ? { width: '100%' } : null
  return (
    <svg viewBox='0 0 100 118' className={styles.hexImage} style={style}>
      <defs>
        <path
          id='hex'
          d='M50,1 L100,29.87 L100,87.6 L50,116.47 L0,87.6 L0,29.87 z'
          stroke='#ffffff'
        />
        <clipPath id='hex-clip-path'>
          <use xlinkHref='#hex' />
        </clipPath>
        <radialGradient id='gradient'>
          <stop offset='10%' stop-color='#ffffff' stop-opacity='0'/>
          <stop offset='100%' stop-color='#ffffff' stop-opacity='0.5'/>
        </radialGradient>
      </defs>
      { renderImage(props.image) }
      <use xlinkHref='#hex' fill='none'/>
      { renderGradient(props.showGradient) }
    </svg>
  )
}
