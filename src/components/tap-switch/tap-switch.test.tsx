import * as React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import TapSwitch from '.'

describe('TapSwitch component', () => {
  let sut: RenderResult

  beforeEach(() => {
    sut = render(<TapSwitch>
      <div data-testid='a' />
      <div data-testid='b' />
    </TapSwitch>)
  })

  test('should render correctly', () => {
    expect(sut.container.innerHTML).toContain('<div class=\"tapSwitch\"')
  })

  test('should switch between items with each click', () => {
    const clickable = sut.getByTestId('tapswitch.button') as HTMLButtonElement
    expect(sut.queryByTestId('a')).toBeDefined()
    fireEvent.click(clickable)
    expect(sut.queryByTestId('b')).toBeDefined()
  })

  test('should rotate back to the first element when on the last one', () => {
    const clickable = sut.getByTestId('tapswitch.button') as HTMLButtonElement
    fireEvent.click(clickable)
    fireEvent.click(clickable)
    expect(sut.queryByTestId('a')).toBeDefined()
  })
})
