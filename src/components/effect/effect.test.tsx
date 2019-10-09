import * as React from 'react'
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react'
import Effect from '.'
import * as Models from '@models'

describe('Effect component', () => {
  let effect: Models.Effect
  let toggleSpy: jest.Mock<Models.Effect>
  let changeSpy: jest.Mock<Models.Effect>
  let blurSpy: jest.Mock<Models.Effect>
  let removeSpy: jest.Mock<Models.Effect>
  let sut: RenderResult

  beforeEach(() => {
    effect = {
      id: '1',
      name: 'n',
      description: 'd',
      active: true,
      target: [ 'a', 'b' ],
      value: 1
    }
    toggleSpy = jest.fn()
    changeSpy = jest.fn()
    blurSpy = jest.fn()
    removeSpy = jest.fn()
  })

  describe('with no edit capability', () => {
    beforeEach(() => {
      sut = render(<Effect
        effect={ effect }
        onToggle={ toggleSpy }
      />)
    })

    test('should render correctly', () => {
      expect(() => sut.getByTestId('non-editable-effect.component')).not.toThrow()
    })

    test('should call onToggle method when active checkbox is clicked', () => {
      const input = sut.getByTestId('Active.input.component')
      const event = {
        bubbles: true,
        target: { checked: false }
      }
      fireEvent(input, new MouseEvent('click', event))
      effect.active = false
      expect(toggleSpy).toHaveBeenCalledWith(effect)
    })
  })

  describe('with edit capability', () => {
    beforeEach(() => {
      sut = render(
        <Effect
          effect={ effect }
          onChange={ changeSpy }
          onRemove={ removeSpy }
          onBlur={ blurSpy }
        />
      )
    })

    test('should render correctly', () => {
      expect(() => sut.getByTestId('editable-effect.component')).not.toThrow()
    })

    test('should call the onChange method when a field is modified', () => {
      const input = sut.getByTestId('Name.input.component')
      const event = { target: { value: 'changed' } }
      fireEvent.change(input, event)
      effect.name = 'changed'
      expect(changeSpy).toHaveBeenCalledWith(effect)
    })

    test('should call the onChange method with a new target array when the target array is added to', () => {
      fireEvent.click(sut.getByTestId('Add Element.button.component'))
      expect(changeSpy).toHaveBeenCalledWith(expect.objectContaining({
        target: [ 'a', 'b', '' ]
      }))
    })

    test('should call onRemove method when Delete button is clicked', () => {
      const button = sut.getByTestId('Delete Effect.button.component')
      fireEvent.click(button)
      expect(removeSpy).toHaveBeenCalledWith(effect)
    })

    test('should not render the delete button when onRemove is not provided', () => {
      cleanup()
      sut = render(<Effect
        effect={effect}
        onChange={changeSpy}
        onBlur={blurSpy}
      />)
      expect(sut.queryByTestId('Delete Effect.button.component')).toBeNull()
    })

    test('should call the onBlur method when an input field is blurred', () => {
      const input = sut.getByTestId('Name.input.component')
      fireEvent.blur(input)
      expect(blurSpy).toHaveBeenCalled()
    })

    test('should gracefully handle a missing onBlur prop', () => {
      cleanup()
      sut = render(<Effect
        effect={effect}
        onChange={changeSpy}
      />)
      const input = sut.getByTestId('Name.input.component')
      fireEvent.blur(input)
    })
  })
})
