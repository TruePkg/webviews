import get from 'lodash/get'
import { default as _debounce } from 'lodash/debounce'

export const DEFAULT_DEBOUNCE_TIME = 400

export const debounceMiddleware = ({ dispatch }) => {
  const debouncers = {}
  return next => {
    return action => {
      const debounceConfig = get(action, 'meta.debounce', false)
      if (debounceConfig) {
        /* istanbul ignore next */
        const {
          time = DEFAULT_DEBOUNCE_TIME,
          action: debouncedAction
        } = debounceConfig

        if (!debouncers[action.type]) {
          debouncers[action.type] = _debounce(func => func(), time)
        }

        debouncers[action.type](() => {
          dispatch(debouncedAction())
        })
      }
      return next(action)
    }
  }
}
