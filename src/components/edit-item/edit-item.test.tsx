import * as React from 'react'
import { cleanup, render, fireEvent } from '@testing-library/react'
import { renderWithRedux, RenderWithRedux } from '../../../utils/testing-render-with-redux'
import EditItem from '.'
import { Stat } from '@models'
import { AppState } from '@state/default-state'
import { EditItemRenderProp } from './edit-item'

describe('EditItem component', () => {
  let appState: AppState
  let item: Stat
  let changeSpy: jest.Mock<Stat>
  let doneSpy: jest.Mock<undefined>
  let cancelSpy: jest.Mock<undefined>
  let passedObjects: { item: Stat, changeHandler: (item: Stat) => void }
  let renderFunc: EditItemRenderProp<Stat>
  let sut: RenderWithRedux

  beforeEach(() => {
    appState = {
      effects: [{
        id: '1',
        name: 'n',
        description: 'd',
        target: [ 'a', 'b' ],
        active: true,
        value: 1
      }]
    } as AppState
    item = {
      id: '1',
      name: 'n',
      shortName: 's',
      description: 'd',
      asEffectTarget: [ 'a', 'b' ],
      effects: [ '1' ],
      value: { thing: 1 }
    }
    changeSpy = jest.fn()
    doneSpy = jest.fn()
    cancelSpy = jest.fn()
    renderFunc = (item: Stat, changeHandler: (item: Stat) => void) => {
      passedObjects = { item, changeHandler }
      return <div>ok</div>
    }
    sut = renderWithRedux(<EditItem
      item={ item }
      render={ renderFunc }
      changeHandler={ changeSpy }
      done={ doneSpy }
      cancel={ cancelSpy }
    />, appState)
  })

  test('should render correctly', () => {
    expect(sut.container.innerHTML).toContain('edit-item')
  })

  test('should pass on the change handler from the parent component', () => {
    expect(passedObjects.item).toBe(item)
    expect(passedObjects.changeHandler).toBe(changeSpy)
  })

  test('should call done when the done button is clicked', () => {
    const button = sut.getByTestId('Done.button.component')
    fireEvent.click(button)
    expect(doneSpy).toHaveBeenCalled()
  })

  test('should not show the cancel button if a cancel handler is not provided', () => {
    cleanup()
    sut = renderWithRedux(<EditItem
      item={ item }
      render={ renderFunc }
      changeHandler={ changeSpy }
      done={ doneSpy }
    />, appState)
    expect(sut.queryByTestId('Cancel.button.component')).toBeNull()
  })

  test('should call cancel when the cancel button is clicked', () => {
    const button = sut.getByTestId('Cancel.button.component')
    fireEvent.click(button)
    expect(cancelSpy).toHaveBeenCalled()
  })

  test('should render correctly when item has no related effects', () => {
    cleanup()
    delete item.effects
    let noEffects = renderWithRedux(<EditItem
      item={ item }
      render={ renderFunc }
      changeHandler={ changeSpy }
      done={ doneSpy }
      cancel={ cancelSpy }
    />, appState)
    expect(noEffects.container.innerHTML).not.toContain('effect.component')
  })

  test('should append added effect ids to the provided stat and call the change handler', () => {
    fireEvent.click(sut.getByTestId('Add Effect.button.component'))
    fireEvent.click(sut.getByTestId('Done Adding Effect.button.component'))
    expect(changeSpy.mock.calls[0][0].effects).toHaveProperty('length', 2)
  })

  test('should create an effects array when one does not already exist', () => {
    cleanup()
    delete item.effects
    sut = renderWithRedux(<EditItem
      item={ item }
      render={ renderFunc }
      changeHandler={ changeSpy }
      done={ doneSpy }
      cancel={ cancelSpy }
    />, appState)
    fireEvent.click(sut.getByTestId('Add Effect.button.component'))
    fireEvent.click(sut.getByTestId('Done Adding Effect.button.component'))
    expect(changeSpy.mock.calls[0][0].effects).toHaveProperty('length', 1)
  })
})
