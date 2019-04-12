import { h, Component } from 'preact'

import { ImageTransform } from '@assets/models'
import HexImage from '@components/hex-image'
import * as styles from './transform-image.scss'

interface TransformImageProps {
  done: (transform: ImageTransform) => void
}

export default class TransformImage extends Component<TransformImageProps, ImageTransform> {
  hexHeight: number
  touchStartCoordinates: ImageTransform
  positionAtTouchStart: ImageTransform

  constructor () {
    super()
    this.state = {
      scale: 1,
      x: 0,
      y: 0
    }
  }

  calculateTouchDistance  (a: Touch, b: Touch) {
    const scaleX = b.clientX - a.clientX
    const scaleY = b.clientY - a.clientY
    return Math.sqrt(scaleX * scaleX + scaleY * scaleY)
  }

  touchMove = (event: TouchEvent) => {
    const newState: ImageTransform = {
      x: this.positionAtTouchStart.x + event.touches[0].clientX - this.touchStartCoordinates.x,
      y: this.positionAtTouchStart.y + event.touches[0].clientY - this.touchStartCoordinates.y
    }
    if (event.touches.length > 1) {
      newState.scale = this.positionAtTouchStart.scale +
        (this.calculateTouchDistance(event.touches[0], event.touches[1]) - this.touchStartCoordinates.scale) /
        this.touchStartCoordinates.scale
    }
    this.setState(newState)
  }

  touchStart = (event: TouchEvent) => {
    event.preventDefault()
    this.touchStartCoordinates = {
      scale: event.touches.length > 1 ? this.calculateTouchDistance(event.touches[0], event.touches[1]) : undefined,
      x: event.touches[0].clientX,
      y: event.touches[0].clientY
    }
    this.positionAtTouchStart = {
      scale: this.state.scale,
      x: this.state.x,
      y: this.state.y
    }
    event.target.addEventListener('touchmove', this.touchMove)
  }

  render () {
    return (
      <div className={ styles.transformImage }>
        <h1>Image Thumbnail</h1>

        <p>
          Drag the image to position it as desired within the hexagon.
          Use two fingers to scale.
        </p>

        <div className={ styles.hexReference }>
          <img
            src=''
            className={ styles.image }
            style={{ top: this.state.y, left: this.state.x, transform: `scale(${this.state.scale})` }}
            onTouchStart={this.touchStart}
          />
          <div className={ styles.hex }><HexImage /></div>
        </div>

        <button
          className={ styles.button }
          onClick={this.props.done}
        >
          DONE
        </button>
      </div>
    )
  }
}
