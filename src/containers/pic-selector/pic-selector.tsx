import * as React from 'react'
import * as styles from './pic-selector.scss'
import { Pic, ImageTransform } from '@models'
import Input from '@components/input'
import Button from '@components/button'
import DraggableThumb from './draggable-thumb'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '@state/default-state'
import { setPicCreator, saveCharacterCreator, loadCharacterCreator } from '@state/actions'

interface PicSelectorProps {
  afterSave: () => void
}

interface PicSelectorState {
  pic: Pic
  useFullPicForThumbnail: boolean
}

const generatePic = (url?: string): Pic => {
  url = url || ''
  return {
    url,
    thumbUrl: url,
    thumbnailTransform: {
      x: 0,
      y: 0,
      scale: 1
    },
    fullTransform: {
      x: 0,
      y: 0,
      scale: 1
    }
  }
}

function clonePic (pic: Pic): Pic {
  return {
    url: pic.url,
    thumbUrl: pic.thumbUrl,
    fullTransform: { ...pic.fullTransform },
    thumbnailTransform: { ...pic.thumbnailTransform }
  }
}

export default function PicSelector ({ afterSave }: PicSelectorProps) {
  const dispatch = useDispatch()
  const pic = useSelector((appState: AppState) => appState.pic)
  const setPic = setPicCreator(dispatch)
  const saveCharacter = saveCharacterCreator(dispatch)

  const [ state, setState ] = React.useState<PicSelectorState>({
    pic: pic || generatePic(),
    useFullPicForThumbnail: false
  } as PicSelectorState)

  function toggleThumbUrl () {
    setState(lastState => ({
      pic: lastState.pic,
      useFullPicForThumbnail: !lastState.useFullPicForThumbnail
    }))
  }

  function updateFullUrl (url: string) {
    setState(lastState => {
      const updated = clonePic(lastState.pic)
      updated.url = url
      if (lastState.useFullPicForThumbnail) { updated.thumbUrl = url }
      return {
        pic: updated,
        useFullPicForThumbnail: lastState.useFullPicForThumbnail
      }
    })
  }

  function updateThumbUrl (thumbUrl: string) {
    setState(lastState => {
      const updated = clonePic(lastState.pic)
      updated.thumbUrl = thumbUrl
      return {
        pic: updated,
        useFullPicForThumbnail: false
      }
    })
  }

  function updateThumbTransform (transform: ImageTransform) {
    setState(lastState => {
      const updated = clonePic(lastState.pic)
      updated.thumbnailTransform = transform
      return {
        pic: updated,
        useFullPicForThumbnail: lastState.useFullPicForThumbnail
      }
    })
  }

  function scaleHandler (sign: 1 | -1): () => void {
    return () => {
      setState(lastState => {
        const clonedPic = clonePic(lastState.pic)
        clonedPic.thumbnailTransform.scale += sign * 0.01
        return { ...lastState, pic: clonedPic }
      })
    }
  }

  function save () {
    setPic(state.pic)
    saveCharacter()
    afterSave()
  }

  function getThumbnailInputNode () {
    if (!state.useFullPicForThumbnail) {
      return (
        <Input
          type='text'
          onChange={updateThumbUrl}
          label='Thumbnail URL'
          value={state.pic.thumbUrl}
        />
      )
    }
    return null
  }

  function getDraggableThumbNode () {
    if (state.pic.thumbUrl) {
      return (
        <DraggableThumb
          url={state.pic.thumbUrl}
          currentTransform={state.pic.thumbnailTransform}
          onTransformUpdate={updateThumbTransform}
        />
      )
    }
    return null
  }

  return (
    <div className={styles.picSelectorWrapper}>
      <div className={styles.picSelector}>
        <div className={styles.picSelectorInner}>
          <div>
            <h2>Full Character Pic</h2>
            <div>{ state.pic.url ? <img src={state.pic.url} /> : null }</div>
            <Input
              type='text'
              onChange={updateFullUrl}
              label='URL'
              value={state.pic.url}
            />
            <div>
              <Input
                type='checkbox'
                onChange={toggleThumbUrl}
                label='use for thumbnail'
                value={state.useFullPicForThumbnail}
              />
            </div>
          </div>
          <div>
            <h2>Thumbnail</h2>
            <div>
              {getThumbnailInputNode()}
            </div>
            <div>
              <Button label='+' onClick={scaleHandler(1)} />
              <Button label='-' onClick={scaleHandler(-1)} />
            </div>
            {getDraggableThumbNode()}
          </div>
        </div>
        <Button label='Save' onClick={save} />
      </div>
    </div>
  )
}
