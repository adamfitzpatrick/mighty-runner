const MINIMUM_HEIGHT = 450
const MINIMUM_WIDTH = 350

const MESSAGES = [
  'This screen seems a wee bit small.  Perhaps try a larger device or change your display settings.',
  'On small screens, this application simply doesn\'t work in landscape mode.  Please rotate your device.'
]

export default function checkDisplay () {
  if (window.innerHeight < MINIMUM_HEIGHT && window.innerWidth < MINIMUM_WIDTH) {
    return MESSAGES[0]
  } else if (window.innerHeight < MINIMUM_HEIGHT) {
    return MESSAGES[1]
  }
}
