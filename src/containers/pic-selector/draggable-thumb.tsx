import * as React from 'react'

import HexImage, { STANDARD_PIXEL_WIDTH, STANDARD_PIXEL_HEIGHT } from '@components/hex-image'
import * as styles from './pic-selector.scss'
import { ImageTransform } from '@models'

const DRAG_BOX_SIDE = 300

interface DraggableThumbProps {
  url: string
  currentTransform: ImageTransform
  onTransformUpdate: (transform: ImageTransform) => void
}

type DraggableThumbState = {
  initial: ImageTransform,
  incrementalVector: ImageTransform
}

const initialLocalState: DraggableThumbState = {
  initial: { x: 0, y: 0, scale: 1 },
  incrementalVector: { x: 0, y: 0, scale: 1 }
}

export default function DraggableThumb ({ url, currentTransform, onTransformUpdate }: DraggableThumbProps) {
  const [state, setState] = React.useState<DraggableThumbState>(initialLocalState)

  function setInitial (current: ImageTransform): void {
    setState(lastState => ({
      ...lastState,
      initial: current
    }))
  }

  function setIncrementalVector (current: ImageTransform): void {
    setState(lastState => {
      const incrementalVector: ImageTransform = {
        x: current.x - lastState.initial.x,
        y: current.y - lastState.initial.y,
        scale: 1
      }
      return { ...lastState, incrementalVector }
    })
  }

  function calculateTransform (): ImageTransform {
    return {
      x: currentTransform.x + state.incrementalVector.x,
      y: currentTransform.y + state.incrementalVector.y,
      scale: 1
    }
  }

  function onDragStart (event: React.DragEvent<HTMLImageElement>) {
    const img = document.createElement('div')
    img.style.visibility = 'hidden'
    document.body.appendChild(img)
    event.dataTransfer.setDragImage(img, 0, 0)
    setInitial({ x: event.clientX, y: event.clientY, scale: 1 })
  }

  function onDrag (event: React.DragEvent<HTMLImageElement>) {
    if (event.clientX !== 0) {
      setIncrementalVector({ x: event.clientX, y: event.clientY, scale: 1 })
    }
  }

  function onDragEnd () {
    setState(initialLocalState)
    onTransformUpdate(calculateTransform())
  }

  function getImageTransformStyle () {
    return {
      top: (300 - STANDARD_PIXEL_HEIGHT) / 2 + currentTransform.y + state.incrementalVector.y,
      left: (DRAG_BOX_SIDE - STANDARD_PIXEL_WIDTH) / 2 + currentTransform.x + state.incrementalVector.x,
      transform: `scale(${currentTransform.scale})`
    }
  }

  return (
    <div data-testid='draggable-thumb.component'>
      <p>
        For thumbnail images, the hexagon will clip your image.  Drag the image
        in the box so that it is clipped the way you want.
      </p>
      <div className={styles.thumbnail}>
        <div
          className={styles.thumbImageWrapper}
          style={getImageTransformStyle()}
        >
          <img
            data-testid='draggable-thumb.component.img'
            src={url}
            draggable
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
          />
        </div>
        <div className={styles.thumbHexWrapper}>
          <HexImage width={ STANDARD_PIXEL_WIDTH + 'px' } />
        </div>
      </div>
    </div>
  )
}
