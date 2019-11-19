import * as React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Summary from '.'

import { character } from '../../../test-fixtures/character'

describe('Summary component', () => {
  let sut: RenderResult

  beforeEach(() => {
    sut = render(
      <Summary character={character} />
    )
  })

  test('should render correctly', () => {
    expect(sut.container.innerHTML).toContain('<div class=\"summary\">')
    expect(sut.queryByTestId('hex-image.component')).toBeDefined()
  })

  test('should display a value for resonance if it exists', () => {
    character.specialAttributes.resonance.value.initial = 5
    character.specialAttributes.magic.value.initial = 0
    sut = render(<Summary character={character} />)
    expect(sut.container.innerHTML).toContain('<div class=\"label\">M/R</div><div class=\"value\">5</div>')
  })
})
