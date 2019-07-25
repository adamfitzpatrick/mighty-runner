import { h } from 'preact'
import deep from 'preact-render-spy'
import Button from '.'

describe('Button component', () => {
  let onClick: jest.Mock

  beforeEach(() => {
    onClick = jest.fn()
  })

  function buildButton (ariaLabel?: string, primary?: boolean, icon?: boolean) {
    return deep(
      <Button
        onClick={onClick}
        ariaLabel={ariaLabel}
        primary={primary}
        icon={icon}
      >
        Stuff
      </Button>,
      { depth: 2 }
    )
  }

  test('should render correctly', () => {
    const button = buildButton()
    expect(button).toMatchSnapshot()
  })

  test('should call the click handler on a click', () => {
    const button = buildButton()
    button.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })

  test('should render with an aria label', () => {
    const button = buildButton('label')
    expect(button).toMatchSnapshot()
  })

  test('should render as primary button', () => {
    const button = buildButton(undefined, true)
    expect(button).toMatchSnapshot()
  })

  test('should render as an icon button', () => {
    const button = buildButton(undefined, undefined, true)
    expect(button).toMatchSnapshot()
  })
})
