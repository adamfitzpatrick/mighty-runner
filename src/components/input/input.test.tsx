import '@testing-library/jest-dom/extend-expect'
import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Input from '.'

describe('Input component', () => {
  let change: { (value: string | number | boolean): void }
  let blur: { (): void }

  function renderComponent (type?: 'text' | 'checkbox' | 'number') {
    type = type || 'text'
    return render(
      <Input
        type={ type }
        label='label'
        value={ type === 'checkbox' ? false : 'value' }
        onChange={ change }
        onBlur={ blur }
      />
    )
  }
  beforeEach(() => {
    change = jest.fn()
    blur = jest.fn()
  })

  test('render correctly', () => {
    const { container } = renderComponent()
    expect(container.innerHTML).toMatchSnapshot()
  })

  test('should handle a checkbox input change', () => {
    const { getByTestId } = renderComponent('checkbox')
    const input = getByTestId('label.input.component') as HTMLInputElement
    const event = {
      bubbles: true,
      target: {
        checked: true,
        value: 'true'
      }
    }
    expect(input.value).toBeFalsy()
    fireEvent(input, new MouseEvent('click', event))
    expect(change).toHaveBeenCalledWith(true)
  })

  test('should handle a textbox input change', () => {
    const { getByTestId } = renderComponent()
    const input = getByTestId('label.input.component') as HTMLInputElement
    const event = {
      target: {
        value: 'changed'
      }
    }
    expect(input.value).toEqual('value')
    fireEvent.change(input, event)
    expect(change).toHaveBeenCalledWith('changed')
  })

  test('should handle a textbox input change with a numeric value', () => {
    const { getByTestId } = renderComponent('number')
    const input = getByTestId('label.input.component') as HTMLInputElement
    const event = {
      target: {
        value: '1'
      }
    }
    expect(input.type).toEqual('text')
    fireEvent.change(input, event)
    expect(change).toHaveBeenCalledWith(1)
  })

  test('should set an invalid numeric for a number input to 0', () => {
    const { getByTestId } = renderComponent('number')
    const input = getByTestId('label.input.component') as HTMLInputElement
    const event = {
      target: {
        value: ''
      }
    }
    fireEvent.change(input, event)
    expect(change).toHaveBeenCalledWith(0)
  })

  test('should handle the blur event', () => {
    const { getByTestId } = renderComponent()
    fireEvent.blur(getByTestId('label.input.component'))
    expect(blur).toHaveBeenCalled()
  })
})
