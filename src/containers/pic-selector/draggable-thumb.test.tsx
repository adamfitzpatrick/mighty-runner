import * as React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { ImageTransform } from '@models'
import DraggableThumb from './draggable-thumb'

describe('draggable-thumb component', () => {
  let clientX: number
  let clientY: number
  let sut: RenderResult
  let img: HTMLImageElement
  let currentTransform: ImageTransform
  let onTransformUpdateSpy: (transform: ImageTransform) => void

  (Event.prototype as any).dataTransfer = { setDragImage: () => { /* */ } }
  Object.defineProperty(Event.prototype, 'clientX', {
    get () { return clientX }
  })
  Object.defineProperty(Event.prototype, 'clientY', {
    get () { return clientY }
  })

  function fireDragEvent (target: HTMLImageElement, type: string, x: number, y: number) {
    clientX = x
    clientY = y;
    (fireEvent as any)[type](target)
  }

  beforeEach(() => {
    currentTransform = { x: 0, y: 0, scale: 1 }
    onTransformUpdateSpy = jest.fn()
    sut = render(
      <DraggableThumb
        url='url'
        currentTransform={currentTransform}
        onTransformUpdate={onTransformUpdateSpy}
      />
    )
    img = sut.getByTestId('draggable-thumb.component.img') as HTMLImageElement
  })

  test('should render successfully', () => {
    expect(sut.container.innerHTML).toContain('<div data-testid=\"draggable-thumb.component\">')
    expect(img).toBeDefined()
  })

  test('should calculate a transform vector after a drag action', () => {
    fireDragEvent(img, 'dragStart', 10, 20)
    fireDragEvent(img, 'drag', 50, 100)
    fireDragEvent(img, 'drag', 100, 200)
    fireDragEvent(img, 'dragEnd', 0, 0)
    expect(onTransformUpdateSpy).toHaveBeenCalledWith({ x: 90, y: 180, scale: 1 })
  })

  test('should ignore drag positioning at 0', () => {
    fireDragEvent(img, 'dragStart', 10, 20)
    fireDragEvent(img, 'drag', 50, 100)
    fireDragEvent(img, 'drag', 100, 200)
    fireDragEvent(img, 'drag', 0, 0)
    fireDragEvent(img, 'dragEnd', 0, 0)
    expect(onTransformUpdateSpy).toHaveBeenCalledWith({ x: 90, y: 180, scale: 1 })
  })

  test('should position the image according to the transform vector', () => {
    cleanup()
    sut = render(
      <DraggableThumb
        url='url'
        currentTransform={{ x: 100, y: 100, scale: 1 }}
        onTransformUpdate={onTransformUpdateSpy}
      />
    )
    expect((sut.getByTestId('draggable-thumb.component.img').parentElement as HTMLDivElement).style.top).toBe('132px')
    expect(sut).toBeDefined()
  })

  test('should calculate a transform incorporating an existing transform value', () => {
    cleanup()
    sut = render(
      <DraggableThumb
        url='url'
        currentTransform={{ x: 100, y: 100, scale: 1 }}
        onTransformUpdate={onTransformUpdateSpy}
      />
    )
    img = sut.getByTestId('draggable-thumb.component.img') as HTMLImageElement
    fireDragEvent(img, 'dragStart', 10, 20)
    fireDragEvent(img, 'drag', 50, 100)
    fireDragEvent(img, 'dragEnd', 0, 0)
    expect(onTransformUpdateSpy).toHaveBeenCalledWith({ x: 140, y: 180, scale: 1 })
  })
})
