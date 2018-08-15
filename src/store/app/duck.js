import { Record, Map } from 'immutable'

import { immutableize } from '../../utils/immutable'
import Config from '../../config'

/**
 * Public: Action Types
 */

// Action types go here
// Example:
// export const ACTION_NAME = 'dock/app/ACTION_NAME'

/**
 * Private: Initial State
 */

class AppStateDefaults extends Record({
  apiOverride: null,
  stripeOverride: null
}) {}

class AppState extends AppStateDefaults {
  constructor(desiredValues) {
    // When we construct InitialState, we automatically update it's default value
    // for apiOverride to be what is stored in localStorage
    const apiOverride = window.localStorage.getItem(
      Config.get('/LocalStorageKeys/ApiOverride')
    )
    const stripeOverride = window.localStorage.getItem(
      Config.get('/LocalStorageKeys/StripeOverride')
    )
    super(new Map({ apiOverride, stripeOverride }).merge(desiredValues))
  }
}

const toInitialState = state => new AppState(state)

/**
 * Public: Reducer
 */

export default function reducer(state = new AppState(), action = {}) {
  if (!(state instanceof AppState)) return toInitialState(immutableize(state))

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