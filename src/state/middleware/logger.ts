import { createLogger } from 'redux-logger'

export default createLogger({
  collapsed: (getState, action, logEntry) => !(logEntry || {}).error
})
