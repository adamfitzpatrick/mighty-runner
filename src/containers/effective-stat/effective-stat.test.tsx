import * as React from 'react'
import { renderWithRedux, RenderWithRedux } from '../../../utils/testing-render-with-redux'
import EffectiveStat from '.'
import { AppState } from '@state/default-state'
import * as Models from '@models'
import { cleanup } from '@testing-library/react'

describe('EffectiveStat container', () => {
  let appState: AppState
  let stat: Models.Stat
  let effects: Models.Effect[]
  let sut: RenderWithRedux

  beforeEach(() => {
    stat = {
      id: '1',
      value: {
        thing: 1
      },
      asEffectTarget: [ 'a', 'b' ]
    } as any as Models.Stat
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
    sut = renderWithRedux(<EffectiveStat stat={stat} />, appState)
  })

  test('should render correctly', () => {
    expect(sut.container.innerHTML).toContain('<span data-testid=\"a.b.effective-stat.container\"')
  })

  test('should not throw an error if the state is missing', () => {
    cleanup()
    delete appState.effects
    sut = renderWithRedux(<EffectiveStat stat={stat} />, appState)
    expect(sut.container.innerHTML).toBe('')
  })

  test('should display the effective value correctly', () => {
    const displaySpan = sut.getByTestId('a.b.effective-stat.container')
    expect(displaySpan.innerHTML).toBe('3')
  })
})
