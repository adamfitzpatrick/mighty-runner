import * as React from 'react'
import { cleanup, render } from '@testing-library/react'
import { renderWithRedux, RenderWithRedux } from '../../../utils/testing-render-with-redux'
import Header from '.'

describe('Header component', () => {
  let sut

  test('Should render the logo and app name with no options', () => {
    sut = render(<Header />)
    expect(sut.container.innerHTML).toContain('<h1 class=\"headerText\">Mighty Runner</h1>')
  })

  test('should render with the provided text', () => {
    sut = render(<Header text='Provided text' />)
    expect(sut.container.innerHTML).toContain('<h1 class=\"headerText\">Provided text</h1>')
  })
})
