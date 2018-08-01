import { Record } from 'immutable'

import immutableize from '../../utils/immutableize'

/**
 * Public: Action Types
 */

// Action types go here
// Example:
// export const ACTION_NAME = '<%= projectActionPrefix %>/<%= duckName %>/ACTION_NAME'

/**
 * Private: Initial State
 */

class <%= duckNameClassified %>State extends Record({
  // State properties go here
}) {}

const toInitialState = (state) =>
  new <%= duckNameClassified %>State(state)

/**
 * Public: Reducer
 */

export default function reducer(state = new <%= duckNameClassified %>State(), action = {}) {
  if (!(state instanceof <%= duckNameClassified %>State)) return toInitialState(immutableize(state))

  switch (action.type) {

    default: {
      return state
    }

  }
}

/**
 * Public: Action Creators
 */

// Action types go here
// Example:
// export const doSomething = (payload) => ({
//   type: DO_SOMETHING,
//   payload
// })
