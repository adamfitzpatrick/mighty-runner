import { h } from 'preact'
import Details1 from '@components/details-page-designs/details-1'
import Details2 from '@components/details-page-designs/details-2'

interface Props {
  id?: string
}

export default function (props: Props) {
  return <Details2 />
}
