import * as React from 'react'

import * as styles from './error.scss'
import { useSelector } from 'react-redux'
import { AppState } from '@state/default-state'

interface Props {}

export default function Error () {
  const apiError = useSelector((state: AppState) => state.apiError)

  if (!apiError) {
    return null
  }

  return <div>Dammit.  There was an error.</div>
}
