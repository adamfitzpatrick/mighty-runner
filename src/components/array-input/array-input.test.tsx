import * as React from 'react'
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react'
import ArrayInput from '.'

describe('ArrayInput component', () => {
  let sut: RenderResult
  let arr: string[]
  let change: jest.Mock<string[]>
  let blur: jest.Mock

  beforeEach(() => {
    arr = [ 'a', 'b', 'c' ]
    change = jest.fn()
    blur = jest.fn()
    sut = render(<ArrayInput label='label' arr={ arr } onChange={ change } onBlur={ blur } />)
  })

  test('should render correctly', () => {
    expect(sut.container.innerHTML).toMatchSnapshot()
  })

  test('should call the change handler with a new array for all changes', () => {
    const secondInput = sut.getByTestId('1.array.input')
    fireEvent.change(secondInput, { target: { value: 'change' } })
    const changeCallArg = change.mock.calls[0][0]
    expect(changeCallArg[1]).toBe('change')
    expect(changeCallArg).not.toBe(arr)
  })

  test('should call the blur handler', () => {
    const secondInput = sut.getByTestId('1.array.input')
    fireEvent.blur(secondInput)
    expect(blur).toHaveBeenCalled()
  })
})
