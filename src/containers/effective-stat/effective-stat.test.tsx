import * as React from 'react'
import { renderWithRedux, RenderWithRedux } from '../../../utils/testing-render-with-redux'
import EffectiveStat from '.'
import { AppState } from '@state/default-state'
import * as Models from '@models'
import { cleanup } from '@testing-library/react'

describe('EffectiveStat container', () => {
  let appState: AppState
  let effects: Models.Effect[]
  let sut: RenderWithRedux

  beforeEach(() => {
    effects = [{
      id: '1',
      name: 'n',
      description: 'd',
      target: [ 'a' , 'b' ],
      value: 2,
      active: true
    }]
    appState = {
      effects
    } as AppState
    sut = renderWithRedux(<EffectiveStat target={[ 'a', 'b' ]} baseValue={1} />, appState)
  })

  test('should render correctly', () => {
    expect(sut.container.innerHTML).toMatchSnapshot()
  })

  test('should not throw an error if the state is missing', () => {
    cleanup()
    delete appState.effects
    sut = renderWithRedux(<EffectiveStat target={[ 'a', 'b' ]} baseValue={1} />, appState)
    expect(sut.container.innerHTML).toMatchSnapshot()
  })

  test('should display the effective value correctly', () => {
    const displaySpan = sut.getByTestId('a.b.effective-stat.container')
    expect(displaySpan.innerHTML).toBe('3')
  })
})
