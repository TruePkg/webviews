import { Record, List } from 'immutable'
import { handle } from 'redux-pack'

import { INIT, LOADING, SUCCESS, ERROR } from '../../utils/phases'
import { immutableize } from '../../utils/immutable'

import * as Api from './api'

/**
 * Public: Action Types
 */

export const FETCH_EXAMPLE = 'true-package/quotes/FETCH_EXAMPLE'
export const TOGGLE_NEWQUOTE = 'true-package/quotes/TOGGLE_NEWQUOTE'
export const TOGGLE_DRAFTS = 'true-package/quotes/TOGGLE_DRAFTS'
export const SHOW_QUOTE_OPTIONS = 'true-package/quotes/SHOW_QUOTE_OPTIONS'

/**
 * Private: Initial State
 */

class QuotesState extends Record({
  phase: INIT,
  exampleThings: List(),
  error: null,
  newQuote: false,
  drafts: false
}) {}

const toInitialState = state =>
  new QuotesState(state).merge({
    exampleThings: List(state.get('exampleThings'))
  })

/**
 * Public: Action Creators
 */

export const fetchExample = () => ({
  type: FETCH_EXAMPLE,
  promise: Api.fetchExample()
})

export const toggleDrafts = bool => ({
  type: TOGGLE_DRAFTS,
  payload: bool
})

export const toggleNewQuote = bool => ({
  type: TOGGLE_NEWQUOTE,
  payload: bool
})

export const showQuoteOptions = () => ({
  type: SHOW_QUOTE_OPTIONS
})

/**
 * Public: Reducer
 */

export default function reducer(state = new QuotesState(), action = {}) {
  if (!(state instanceof QuotesState)) return toInitialState(immutableize(state))

  const { type, payload } = action
/* eslint-disable */
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

    case TOGGLE_DRAFTS: {
      return state.merge({
        newQuote: false,
        drafts: true
      })
    }

    case TOGGLE_NEWQUOTE: {
      return state.merge({
        newQuote: true,
        drafts: false
      })
    }

    case SHOW_QUOTE_OPTIONS: {
      return state.merge({
        newQuote: false,
        drafts: false
      })
    }

    default: {
      return state
    }
  }
}
