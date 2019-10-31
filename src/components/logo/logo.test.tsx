import * as React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Logo from '.'

describe('Logo component', () => {
  let sut: RenderResult

  test('should render the logo', () => {
    sut = render(<Logo />)
    expect(sut.container.innerHTML).toContain('logo')
  })

  test('should render with a custom stroke color', () => {
    sut = render(<Logo stroke='#000000' />)
    expect(sut.container.innerHTML).toContain('style=\"stroke: #000000')
  })

  test('should render with a custom fill color', () => {
    sut = render(<Logo fill='#ffffff' />)
    expect(sut.container.innerHTML).toContain('style=\"stroke: rgb(255, 255, 255); fill: #ffffff')
  })
})
