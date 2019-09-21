import * as React from 'react'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import Button from '.'

describe('Button component', () => {
  let clickSpy: jest.Mock<undefined>
  let sut: RenderResult
  let button: HTMLButtonElement

  beforeEach(() => {
    clickSpy = jest.fn()
    sut = render(<Button label='label' onClick={ clickSpy } />)
    button = sut.getByTestId('label.button.component') as HTMLButtonElement
  })

  test('should render correctly', () => {
    expect(sut.container.innerHTML).toMatchSnapshot()
  })

  test('should call the click handler on a click action', () => {
    const event = { bubbles: true }
    fireEvent.click(button, event)
    expect(clickSpy).toHaveBeenCalled()
  })
})
