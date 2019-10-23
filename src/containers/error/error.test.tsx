import * as React from 'react'
import { cleanup, render } from '@testing-library/react'
import { renderWithRedux, RenderWithRedux } from '../../../utils/testing-render-with-redux'
import Error from '.'
import { AppState } from '@state/default-state'

describe('Error container', () => {
  let appState: AppState
  let sut: RenderWithRedux

  test('should show nothing if there is no unresolved API error', () => {
    appState = {
      apiError: false
    } as AppState
    sut = renderWithRedux(<Error />, appState)
    expect(sut.container.innerHTML).toBe('')
  })

  test('should indicate the error state if there is an unresolved API error', () => {
    appState = {
      apiError: true
    } as AppState
    sut = renderWithRedux(<Error />, appState)
    expect(sut.container.innerHTML).toContain('error')
  })
})
