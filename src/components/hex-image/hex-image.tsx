import * as React from 'react'

import * as styles from './hex-image.scss'
import { Pic } from '@models'

export const STANDARD_PIXEL_WIDTH = 200
export const STANDARD_PIXEL_HEIGHT = 236
export const ASPECT_RATIO = STANDARD_PIXEL_HEIGHT / STANDARD_PIXEL_WIDTH

export interface HexImageProps {
  showGradient?: boolean
  thumb?: boolean
  pic?: Pic | null
  dead?: boolean,
  width?: string
}

function getTransform (pic: Pic, isThumb?: boolean) {
  let scale = pic.fullTransform.scale
  let x = pic.fullTransform.x
  let y = pic.fullTransform.y
  if (isThumb) {
    scale = pic.thumbnailTransform.scale
    x = pic.thumbnailTransform.x
    y = pic.thumbnailTransform.y
  }
  return { scale, x, y }
}

function selectUrl (pic: Pic, isThumb?: boolean) {
  if (isThumb) {
    return pic.thumbUrl
  } else {
    return pic.url
  }
}

function renderImage (pic?: Pic, isThumb?: boolean, dead?: boolean) {
  if (pic) {
    const transform = getTransform(pic, isThumb)
    const url = selectUrl(pic, isThumb)
    return <image
      xlinkHref={url}
      filter={ dead ? 'url(#grayscale)' : '' }
      width={100 * (transform.scale)}
      height={131}
      clipPath='url(#hex-clip-path)'
      webkit-clip-path='url(#hex-clip-path)'
      className={styles.clippedHexImage}
      x={transform.x}
      y={transform.y}
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
    strokeWidth='10px'
    clipPath='url(#hex-clip-path)'
  />
}

export default function HexImage (props: HexImageProps) {
  const style = props.width ? { width: props.width } : undefined
  return (
    <svg viewBox='0 0 100 118' className={styles.hexImage} style={style}>
      <defs>
        <radialGradient id='gradient'>
          <stop offset='10%' stopColor='#ffffff' stopOpacity='0'/>
          <stop offset='95%' stopColor='#ffffff' stopOpacity='0.5'/>
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
      { renderImage(props.pic || undefined, props.thumb, props.dead) }
      { props.dead ? renderDead() : null }
      { renderGradient(props.showGradient) }
      <use xlinkHref='#hex' fill='none' strokeWidth='1px' />
    </svg>
  )
}
