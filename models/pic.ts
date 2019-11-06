export interface ImageTransform {
  x: number
  y: number
  scale?: number
}

export interface Pic {
  url: string
  thumbUrl?: string
  thumbnailTransform: ImageTransform
  fullTransform: ImageTransform
}
