import { Record, List } from 'immutable'
import { handle } from 'redux-pack'

import { INIT, LOADING, SUCCESS, ERROR } from '../../utils/phases'
import immutableize from '../../utils/immutableize'

import * as Api from './api'

/**
 * Public: Action Types
 */

export const FETCH_EXAMPLE = '<%= projectActionPrefix %>/<%= duckName %>/FETCH_EXAMPLE'

/**
 * Private: Initial State
 */

class <%= duckNameClassified %>State extends Record({
  phase: INIT,
  exampleThings: List(),
  error: null
}) {}

const toInitialState = state =>
  new <%= duckNameClassified %>State(state).merge({
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

export default function reducer(state = new <%= duckNameClassified %>State(), action = {}) {
  if (!(state instanceof <%= duckNameClassified %>State)) return toInitialState(immutableize(state))

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
