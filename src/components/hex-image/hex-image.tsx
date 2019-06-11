import { h } from 'preact'

import * as styles from './hex-image.scss'
import { ImageDefinition } from '@assets/models'


export interface HexImageProps {
  showGradient?: boolean
  image?: ImageDefinition
  center?: boolean,
  dead?: boolean,
  bold?: boolean,
  width?: string
}

function renderImage (image?: ImageDefinition, dead?: boolean) {
  if (image) {
    return <image
      xlinkHref={image.url}
      filter={ dead ? 'url(#grayscale)' : '' }
      width={100 * (image.thumbnailTransform.scale || 1)}
      height={131}
      clip-path='url(#hex-clip-path)'
      webkit-clip-path='url(#hex-clip-path)'
      className={styles.clippedHexImage}
      x={image.thumbnailTransform.x}
      y={image.thumbnailTransform.y}
    />
  }
  return null
}

function renderGradient (showGradient?: boolean) {
  if (showGradient) {
    return <use xlinkHref='#hex' fill='url(#gradient)' />
  }
  return null
}

function renderDead () {
  return <path
    d='M0,10 L100,108 M100,10 L0,108'
    stroke='rgb(167, 35, 26)'
    stroke-width='10px'
    clip-path='url(#hex-clip-path)'
  />
}

export default function HexImage (props: HexImageProps) {
  const style = props.center ? { width: '100%' } : (props.width ? { width: props.width } : null)
  return (
    <svg viewBox='0 0 100 118' className={styles.hexImage} style={style}>
      <defs>
        <radialGradient id='gradient'>
          <stop offset='10%' stop-color='#ffffff' stop-opacity='0'/>
          <stop offset='95%' stop-color='#ffffff' stop-opacity='0.5'/>
        </radialGradient>
        <filter id='grayscale'>
          <feColorMatrix
            type='matrix'
            values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'
          />
        </filter>
        <path
          id='hex'
          d='M50,1 L100,29.87 L100,87.6 L50,116.47 L0,87.6 L0,29.87 z'
          stroke='#ffffff'
        />
        <clipPath id='hex-clip-path'>
          <use xlinkHref='#hex' />
        </clipPath>
      </defs>
      { renderImage(props.image, props.dead) }
      { props.dead ? renderDead() : null }
      { renderGradient(props.showGradient) }
      <use xlinkHref='#hex' fill='none' stroke-width={props.bold ? '4px' : '1px' }/>
    </svg>
  )
}
