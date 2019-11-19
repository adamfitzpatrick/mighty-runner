import * as React from 'react'
import { render, RenderResult } from '@testing-library/react'
import HexImage from '.'
import { Pic } from '@models'

describe('HexImage component', () => {
  let pic: Pic
  let sut: RenderResult
  let deathNode: string
  let gradientNode: string

  beforeEach(() => {
    pic = {
      url: 'pic',
      thumbUrl: 'thumb',
      thumbnailTransform: {
        x: 0,
        y: 0,
        scale: 1,
        originalHeight: 100,
        originalWidth: 100
      },
      fullTransform: {
        x: 1,
        y: 1,
        scale: 2
      }
    }
    deathNode = '<path d=\"M0,10 L100,108 M100,10 L0,108\" stroke=\"rgb(167, 35, 26)\" ' +
      'stroke-width=\"10px\" clip-path=\"url(#hex-clip-path)\">'
    gradientNode = '<use xlink:href=\"#hex\" fill=\"url(#gradient)\"></use>'
  })

  test('should render a thumbnail pic using the thumbnail transform', () => {
    sut = render(<HexImage pic={pic} thumb />)
    const imageNode = '<image xlink:href=\"thumb\" filter=\"\" width=\"50\" height=\"50\" ' +
      'clip-path=\"url(#hex-clip-path)\" webkit-clip-path=\"url(#hex-clip-path)\" ' +
      'class=\"clippedHexImage\" x=\"0\" y=\"0\"></image>'
    expect(sut.container.innerHTML).toContain(imageNode)
    expect(sut.container.innerHTML).not.toContain(deathNode)
    expect(sut.container.innerHTML).not.toContain(gradientNode)
  })

  test('should render a "dead" pic', () => {
    sut = render(<HexImage pic={pic} dead />)
    expect(sut.container.innerHTML).toContain(deathNode)
  })

  test('should render with a specified image width', () => {
    sut = render(<HexImage pic={pic} width='200px' />)
    expect(sut.container.innerHTML).toContain(
      '<svg viewBox=\"0 0 100 118\" class=\"hexImage\" style=\"width: 200px;\"'
    )
  })

  test('should render with no image', () => {
    sut = render(<HexImage />)
    expect(sut.container.innerHTML).not.toContain('<image')
  })

  test('should render with a gradient overlay', () => {
    sut = render(<HexImage pic={pic} showGradient />)
    expect(sut.container.innerHTML).toContain(gradientNode)
  })
})
