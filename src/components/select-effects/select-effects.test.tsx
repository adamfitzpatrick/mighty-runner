import { h } from 'preact'
import deep from 'preact-render-spy'
import SelectEffects from '.'
import { Effect } from '@models';

describe('SelectEffects component', () => {
  let parentStat: HTMLElement
  let effects: Effect[]
  let toggleHandler: (effectId: string) => void

  beforeEach(() => {
    effects = [{
      name: 'Effect 1',
      id: '1',
      value: 1,
      active: true,
      target: [ 'target', '1' ]
    }, {
      name: 'Effect 2',
      id: '2',
      value: 3,
      active: false,
      target: [ 'target', '1' ]
    }]
    toggleHandler = jest.fn()
  })

  test('should render correctly with no optional props', () => {
    const selectEffects = deep(
      <SelectEffects effects={effects} toggleHandler={toggleHandler} parentStat={parentStat} />,
      { depth: 2 }
    )
    expect(selectEffects).toMatchSnapshot()
  })

  test('should render correctly when visible', () => {
    const selectEffects = deep(
      <SelectEffects effects={effects} toggleHandler={toggleHandler} visible parentStat={parentStat} />,
      { depth: 2 }
    )
    expect(selectEffects).toMatchSnapshot()
  })

  test('should render correctly with the top prop', () => {
    const selectEffects = deep(
      <SelectEffects effects={effects} toggleHandler={toggleHandler} visible top parentStat={parentStat} />,
      { depth: 2 }
    )
    expect(selectEffects).toMatchSnapshot()
  })

  test('should render correctly with the left prop', () => {
    const selectEffects = deep(
      <SelectEffects effects={effects} toggleHandler={toggleHandler} visible left parentStat={parentStat} />,
      { depth: 2 }
    )
    expect(selectEffects).toMatchSnapshot()
  })

  test('should render correctly with the left & top props', () => {
    const selectEffects = deep(
      <SelectEffects effects={effects} toggleHandler={toggleHandler} visible top left parentStat={parentStat} />,
      { depth: 2 }
    )
    expect(selectEffects).toMatchSnapshot()
  })

  test('should render with sufficient height to contain all effects when required', () => {
    effects.concat([{
      name: 'Effect 3',
      id: '3',
      value: 3,
      active: false,
      target: [ 'target', '3' ]
    }, {
      name: 'Effect 4',
      id: '4',
      value: 4,
      active: true,
      target: [ 'target', '4' ]
    }])
    const selectEffects = deep(
      <SelectEffects effects={effects} toggleHandler={toggleHandler} visible parentStat={parentStat} />,
      { depth: 2 }
    )
    expect(selectEffects).toMatchSnapshot()
  })

  describe('when an effect is clicked', () => {
    test('should call the provided toggle handler with the effect ID string', () => {
      const selectEffects = deep(
        <SelectEffects effects={effects} toggleHandler={toggleHandler} visible parentStat={parentStat} />,
        { depth: 2 }
      )
      selectEffects.find('input').at(0).simulate('click')
      expect(toggleHandler).toHaveBeenCalledWith('1')
    })
  })
})
