import { h } from 'preact'
import deep, { RenderContext } from 'preact-render-spy'
import EffectToggle from '.'
import { Effect } from '@models'


describe('EffectToggle component', () => {
  let effect: Effect
  let toggleHandler: (id: string) => void
  type Props = {
    effect: Effect
    toggleHandler: typeof toggleHandler
  }
  let effectToggle: RenderContext<Props, {}>

  beforeEach(() => {
    effect = {
      id: '1',
      name: 'effect',
      target: [ 'target' ],
      active: false,
      value: 1
    }
    toggleHandler = jest.fn()
    effectToggle = deep(<EffectToggle effect={effect} toggleHandler={toggleHandler} />)
  })

  test('should render correctly', () => {
    expect(effectToggle).toMatchSnapshot()
  })

  test('when clicked should call the toggle handler', () => {
    effectToggle.find('input').simulate('click')
    expect(toggleHandler).toHaveBeenCalledWith('1')
  })
})
