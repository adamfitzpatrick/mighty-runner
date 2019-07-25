import { h } from 'preact'
import deep, { RenderContext } from 'preact-render-spy'
import SmartStat from '.'
import { PersistableCharacter, Attribute, Effect } from '@models'
import { activeCharacter } from '@state/active-character-store'

type Props = { statPath: string[], round?: boolean }
type State = { showEffects: boolean }
type EffectsProps = {
  effects: Effect[]
  visible?: boolean
  left?: boolean
  top?: boolean
}

describe('SmartStat container', () => {
  let smartStat: RenderContext<Props, State>
  let persistableCharacter: PersistableCharacter

  beforeEach(() => {
    const character = {
      userId: 'USERID',
      id: '1',
      name: 'Character'
    }
    const attributes = {
      agility: { value: { initial: 1, chargen: 5 }, asTarget: [ 'attributes', 'agility' ] } as Attribute
    }
    const otherAttributes = {
      essence: { value: { initial: 6 }, asTarget: [ 'otherAttributes', 'essence' ] } as Attribute
    }
    const effects = [{
      name: 'Effect 1',
      id: '1',
      value: 1,
      active: true,
      target: [ 'attributes', 'agility' ]
    }, {
      name: 'Effect 2',
      id: '2',
      value: 145,
      active: false,
      target: [ 'otherAttributes', 'essence' ]
    }]
    persistableCharacter = {
      userId: character.userId,
      id: character.id,
      name: character.name,
      attributes,
      otherAttributes,
      effects
    }
    activeCharacter.setActiveCharacter(persistableCharacter)
  })

  beforeEach(() => {
    smartStat = deep(
      <SmartStat
        activeCharacter={activeCharacter}
        statName='agility'
        effectableGroup='attributes'
      />,
      { depth: 3 }
    )
  })

  describe('when rendering', () => {
    test('should show the correct attribute value', () => {
      expect(smartStat).toMatchSnapshot()
      expect(smartStat.find<{ value: string }, {}>('Stat').attrs().value).toEqual(7)
    })

    test('should reflect the activation state of related effects', () => {
      persistableCharacter.effects[0].active = false
      activeCharacter.setActiveCharacter(persistableCharacter)
      smartStat = deep(
        <SmartStat
          activeCharacter={activeCharacter}
          statName='agility'
          effectableGroup='attributes'
        />,
        { depth: 3 }
      )
      expect(smartStat.find<{ value: string }, {}>('Stat').attrs().value).toEqual(6)
    })
  })

  test('should render properly as a round design', () => {
    let smartStat = deep(
      <SmartStat
        activeCharacter={activeCharacter}
        statName='agility'
        effectableGroup='attributes'
        round
      />,
      { depth: 3 }
    )
    expect(smartStat).toMatchSnapshot()
  })

  describe('when clicked', () => {
    test('should expand the effects toggle display with the relevant effects', () => {
      smartStat.find('button').simulate('click')
      let effects = smartStat.find<EffectsProps, {}>('SelectEffects')
      expect(effects.attrs().visible).toBeTruthy()
      expect(effects.attrs().effects.length).toEqual(1)
      smartStat.find('button').simulate('click')
      expect(smartStat.find<EffectsProps, {}>('SelectEffects').attrs().visible).toBeFalsy()
    })
  })

  describe('when click occurs outside of component', () => {
    test('should collapse the effects toggle', (done) => {
      smartStat.find('button').simulate('click')
      expect(smartStat.find<EffectsProps, {}>('SelectEffects').attrs().visible).toBeTruthy()
      document.dispatchEvent(new Event('click'))
      setImmediate(() => {
        expect(smartStat.find<EffectsProps, {}>('SelectEffects').attrs().visible).toBeFalsy()
        done()
      })
    })
  })

  describe('effectClickHandler', () => {
    test('should toggle the appropriate effect state', () => {
      activeCharacter.toggleEffect = jest.fn()
      smartStat.find('EffectToggle').first()[0].attributes.toggleHandler('1')
      expect(activeCharacter.toggleEffect).toHaveBeenCalledWith('1')
    })
  })

  describe('componentDidMount', () => {
    test('should modify the effects display when the stat is near the right or bottom of the screen', done => {
      Element.prototype.getBoundingClientRect = jest.fn(() => {
        return { left: 1000, top: 1000 }
      })
      let smartStat = deep(
        <SmartStat
          activeCharacter={activeCharacter}
          statName='agility'
          effectableGroup='attributes'
          round
        />,
        { depth: 3 }
      )
      setImmediate(() => {
        const effects = smartStat.find<EffectsProps, {}>('SelectEffects')
        expect(effects.attrs().left).toBeTruthy()
        expect(effects.attrs().top).toBeTruthy()
        done()
      })
    })
  })

  describe('componentWillUnmount', () => {
    test('should remove the click event listener from document', () => {
      document.removeEventListener = jest.fn()
      smartStat.render(null as any as JSX.Element)
      expect(document.removeEventListener).toHaveBeenCalled()
    })
  })
})
