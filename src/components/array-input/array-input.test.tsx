import * as React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import ArrayInput from '.'

describe('ArrayInput component', () => {
  let sut: RenderResult
  let arr: string[]
  let changeSpy: (arr: (string | number)[]) => void
  let addSpy: () => void
  let blurSpy: () => void

  beforeEach(() => {
    arr = [ 'a', 'b', 'c' ]
    changeSpy = jest.fn()
    addSpy = jest.fn()
    blurSpy = jest.fn()
    sut = render(
      <ArrayInput
        label='label'
        arr={arr}
        onChange={changeSpy}
        onAdd={addSpy}
        onBlur={blurSpy}
      />)
  })

  test('should render correctly', () => {
    expect(sut.container.innerHTML).toMatchSnapshot()
  })

  test('should call the change handler with a new array for all changes', () => {
    const secondInput = sut.getByTestId('1.array.input')
    fireEvent.change(secondInput, { target: { value: 'change' } })
    const changeCallArg = (changeSpy as jest.Mock).mock.calls[0][0]
    expect(changeCallArg[1]).toBe('change')
    expect(changeCallArg).not.toBe(arr)
  })

  test('should call the add handler when the add button is clicked', () => {
    const addButton = sut.getByTestId('Add Element.button.component')
    fireEvent.click(addButton)
    expect(addSpy).toHaveBeenCalled()
  })

  test('should not render an add button if there is no add handler', () => {
    cleanup()
    sut = render(<ArrayInput label='label' arr={arr} onChange={changeSpy} onBlur={blurSpy} />)
    expect(sut.queryByTestId('Add Element.button.component'))
  })

  test('should call the blur handler', () => {
    const secondInput = sut.getByTestId('1.array.input')
    fireEvent.blur(secondInput)
    expect(blurSpy).toHaveBeenCalled()
  })
})
