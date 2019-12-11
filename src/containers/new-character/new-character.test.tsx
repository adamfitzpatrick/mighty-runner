jest.mock('react-router-dom', () => ({
  useHistory: jest.fn()
}))
import * as reactRouterDom from 'react-router-dom'

import * as React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderWithRedux, RenderWithRedux } from '../../../utils/testing-render-with-redux'

import NewCharacter from '.'
import { AppState } from '@state/default-state'
import { ActiveCharacterAction } from '@state/actions'

describe('NewCharacter component', () => {
  let appState: AppState
  let historyMock: { push: jest.Mock }
  let sut: RenderWithRedux

  beforeEach(() => {
    appState = {} as AppState
    historyMock = { push: jest.fn() }
    reactRouterDom.useHistory.mockReturnValue(historyMock)
    sut = renderWithRedux(<NewCharacter />, appState)
  })

  test('render correctly', () => {
    expect(sut.container.innerHTML).toContain('class=\"newCharacter\"')
  })

  test('should set a minimum viable character as the active character when clicked', () => {
    const button = sut.getByTestId('add.button.component')
    fireEvent.click(button)
    expect(sut.dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
      type: ActiveCharacterAction.SET_ACTIVE_CHARACTER
    }))
    expect(historyMock.push.mock.calls[0][0]).toMatch(/\/form\//)
  })
})
