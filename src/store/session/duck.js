import { Record, List } from 'immutable'
import { handle } from 'redux-pack'

import { INIT, LOADING, SUCCESS, ERROR } from '../../utils/phases'
import { immutableize } from '../../utils/immutable'

import * as Api from './api'

/**
 * Public: Action Types
 */

export const FETCH_EXAMPLE = 'true-package/session/FETCH_EXAMPLE'

/**
 * Private: Initial State
 */

class SessionState extends Record({
  phase: INIT,
  exampleThings: List(),
  error: null
}) {}

const toInitialState = state =>
  new SessionState(state).merge({
    exampleThings: List(state.get('exampleThings'))
  })

/**
 * Public: Action Creators
 */

export const fetchExample = () => ({
  type: FETCH_EXAMPLE,
  promise: Api.fetchExample()
})

/**
 * Public: Reducer
 */

export default function reducer(state = new SessionState(), action = {}) {
  if (!(state instanceof SessionState)) return toInitialState(immutableize(state))

  const { type, payload } = action

  switch (type) {
    case FETCH_EXAMPLE: {
      return handle(state, action, {
        start: prevState => prevState.merge({ phase: LOADING, error: null }),
        failure: prevState =>
          prevState.merge({ phase: ERROR, error: payload.error }),
        success: prevState => {
          return prevState.merge({
            phase: SUCCESS,
            exampleThings: action.payload.things,
            error: null
          })
        }
      })
    }
    default: {
      return state
    }
  }
}
