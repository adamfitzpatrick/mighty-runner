export interface ImageTransform {
  x: number
  y: number
  scale: number
  originalWidth?: number
  originalHeight?: number
}

export interface Pic {
  url: string
  thumbUrl: string
  thumbnailTransform: ImageTransform
  fullTransform: ImageTransform
}
