import * as React from 'react'
import { cleanup, fireEvent, act } from '@testing-library/react'
import { renderWithRedux, RenderWithRedux } from '../../../utils/testing-render-with-redux'

import DraggableThumb from './draggable-thumb'
jest.mock('./draggable-thumb')
const actualDraggableThumb = jest.requireActual('./draggable-thumb')
import PicSelector from '.'
import { AppState } from '@state/default-state'
import { PicAction, ActiveCharacterAction } from '@state/actions'
import { Pic, ImageTransform } from '@models'

describe('PicSelector container', () => {
  let pic: Pic
  let appState: AppState
  let sut: RenderWithRedux
  let fullPicNode: string
  let thumbNode: string
  let thumbnailTransformUpdater: (transform: ImageTransform) => void

  beforeEach(() => {
    pic = {
      url: 'pic',
      thumbUrl: 'thumb',
      thumbnailTransform: {
        x: 0,
        y: 0,
        scale: 1
      },
      fullTransform: {
        x: 0,
        y: 0,
        scale: 1
      }
    }
    appState = {
      pic
    } as AppState
    (DraggableThumb as jest.Mock).mockImplementation(function (props: any) {
      thumbnailTransformUpdater = props.onTransformUpdate
      return actualDraggableThumb.default(props)
    })
    sut = renderWithRedux(<PicSelector afterSave={() => { /* */ }} />, appState)
    fullPicNode = '<img src=\"pic\">'
  })

  test('should render with populated urls', () => {
    expect(sut.container.innerHTML).toContain('<div class=\"picSelector\">')
    expect(sut.container.innerHTML).toContain(fullPicNode)
    expect(sut.queryByTestId('draggable-thumb.component')).toBeDefined()
  })

  test('should render without a thumb url', () => {
    cleanup()
    appState.pic!.thumbUrl = ''
    sut = renderWithRedux(<PicSelector afterSave={() => { /* */ }} />, appState)
    expect(sut.container.innerHTML).toContain('<div class=\"picSelector\">')
    expect(sut.container.innerHTML).toContain(fullPicNode)
    expect(sut.container.innerHTML).not.toContain(thumbNode)
  })

  test('should render without a full pic url', () => {
    cleanup()
    appState.pic!.url = ''
    sut = renderWithRedux(<PicSelector afterSave={() => { /* */ }} />, appState)
    expect(sut.container.innerHTML).toContain('<div class=\"picSelector\">')
    expect(sut.container.innerHTML).not.toContain(fullPicNode)
    expect(sut.queryByTestId('draggable-thumb.component')).toBeDefined()
  })

  test('should render correctly with no pic state', () => {
    sut = renderWithRedux(<PicSelector afterSave={() => { /* */ }} />, {} as AppState)
    expect(sut.container.innerHTML).toContain('<div class=\"picSelector\">')
    expect(sut.container.innerHTML).not.toContain(fullPicNode)
    expect(sut.container.innerHTML).not.toContain(thumbNode)
  })

  test('should not show a URL input for the thumbnail when the "use for thumbnail" box is checked', () => {
    expect(sut.queryByTestId('Thumbnail URL.input.component')).not.toBeNull()
    const checkbox = sut.getByTestId('use for thumbnail.input.component')
    const event = {
      bubbles: true,
      target: {
        checked: true,
        value: 'true'
      }
    }
    fireEvent(checkbox, new MouseEvent('click', event))
    expect(sut.queryByTestId('Thumbnail URL.input.component')).toBeNull()
  })

  describe('url input', () => {
    test('should update the local state on change', () => {
      const urlInput = sut.getByTestId('URL.input.component')
      fireEvent.change(urlInput, { target: { value: 'new url' } })
      expect((sut.getByTestId('URL.input.component') as HTMLInputElement).value).toBe('new url')
    })
  })

  describe('thumbnail input', () => {
    test('should update the local state on change', () => {
      const thumbInput = sut.getByTestId('Thumbnail URL.input.component')
      fireEvent.change(thumbInput, { target: { value: 'thumb new url' } })
      expect((sut.getByTestId('Thumbnail URL.input.component') as HTMLInputElement).value).toBe('thumb new url')
    })
  })

  describe('when the save button is clicked', () => {
    let saveButton: HTMLButtonElement
    let urlInput: HTMLInputElement
    let thumbInput: HTMLInputElement
    let scaleButton: HTMLButtonElement

    beforeEach(() => {
      saveButton = sut.getByTestId('Save.button.component') as HTMLButtonElement
      urlInput = sut.getByTestId('URL.input.component') as HTMLInputElement
      thumbInput = sut.getByTestId('Thumbnail URL.input.component') as HTMLInputElement
      scaleButton = sut.getByTestId('+.button.component') as HTMLButtonElement
    })

    test('should set the application state with new data', () => {
      // The following is wrapped in act because the prop passed to the child
      // is being called directly. The decision was made to do this because of
      // the challenge of compelling JSDOM to properly handle drag events.
      // Testing for the actual drag events has been done within draggable-thumb
      // and the methodology is not being repeated here simply to reduce effort.
      act(() => thumbnailTransformUpdater({ x: 100, y: 100, scale: 1 }))
      fireEvent.change(urlInput, { target: { value: 'new url' } })
      fireEvent.change(thumbInput, { target: { value: 'new thumb url' } })
      fireEvent.click(scaleButton)
      fireEvent.click(saveButton)
      pic.url = 'new url'
      pic.thumbUrl = 'new thumb url'
      pic.thumbnailTransform = { x: 100, y: 100, scale: 1.01 }
      expect(sut.dispatchSpy).toHaveBeenCalledWith({
        type: PicAction.SET_PIC,
        payload: pic
      })
      expect(sut.dispatchSpy).toHaveBeenCalledWith({
        type: ActiveCharacterAction.SAVE_CHARACTER
      })
    })

    test('should update the thumbUrl from the full url if useFullPicForThumbnail is checked', () => {
      const checkbox = sut.getByTestId('use for thumbnail.input.component')
      const event = {
        bubbles: true,
        target: {
          checked: true,
          value: 'true'
        }
      }
      fireEvent(checkbox, new MouseEvent('click', event))
      fireEvent.change(urlInput, { target: { value: 'new url' } })
      fireEvent.click(saveButton)
      pic.url = 'new url'
      pic.thumbUrl = 'new url'
      expect(sut.dispatchSpy).toHaveBeenCalledWith({
        type: PicAction.SET_PIC,
        payload: pic
      })
    })
  })
})
