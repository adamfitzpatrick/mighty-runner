import { useDispatch } from 'react-redux'
import { loadCharactersCreator } from '@state/actions'

export default function Bootstrap () {
  loadCharactersCreator(useDispatch())()

  return null
}
