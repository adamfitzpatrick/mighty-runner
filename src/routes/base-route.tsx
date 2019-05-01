import { h } from 'preact'

interface Props {
  path: string
}

export default function BaseRoute (props: Props) {
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        fontSize: '5rem'
      }}>
        Mighty Runner
      </div>
      <div style={{
        opacity: '0.5',
        fontSize: '5rem',
        position: 'absolute'
      }}>
        Mighty Runner
      </div>
    </div>
  )
}
