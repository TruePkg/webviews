import { Record, Map } from 'immutable'
import { handle } from 'redux-pack'

import { INIT, LOADING, SUCCESS, ERROR } from '../../utils/phases'
import { immutableize } from '../../utils/immutable'
import Config from '../../config'

import * as Api from './api'

/**
 * Public: Action Types
 */

export const FETCH_EXAMPLE = 'true-package/session/FETCH_EXAMPLE'
export const LOGIN_USER = 'true-package/session/LOGIN_USER'
export const SET_TOKEN = 'true-package/session/SET_TOKEN'
export const LOGOUT_USER = 'true-package/session/LOGOUT_USER'
export const ASSUME_SESSION = 'true-package/session/ASSUME_SESSION'
export const RESUME_SESSION = 'true-package/session/RESUME_SESSION'

const noFetchingAnotherTokenError = () =>
  new Error(
    'You are trying to assume a token while a stashed token is already present. This is a NO NO. Make sure you clean up the previously stashed token before trying to run this action again.'
  )

/**
 * Private: Initial State
 */

class SessionStateDefaults extends Record({
  phase: INIT,
  token: null,
  stashedToken: null
}) {}

export class SessionState extends SessionStateDefaults {
  constructor(desiredValues) {
    let phase = INIT
    // When we construct InitialState, we automatically update it's default value
    // for token to be what is stored in localStorage
    const token = window.localStorage.getItem(
      Config.get('/LocalStorageKeys/Authorization')
    )
    const stashedToken = window.localStorage.getItem(
      Config.get('/LocalStorageKeys/StashedAuth')
    )
    if (token) phase = SUCCESS
    super(new Map({ token, stashedToken, phase }).merge(desiredValues))
  }
}

const toInitialState = state => new SessionState(state)

/**
 * Public: Action Creators
 */

export const loginUser = credentials => {
  return {
    type: LOGIN_USER,
    promise: Api.loginUser(credentials)
  }
}

export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  }
}

export const setToken = token => {
  return {
    type: SET_TOKEN,
    payload: token
  }
}

export const assumeSession = userId => {
  return dispatch => {
    if (
      window.localStorage.getItem(Config.get('/LocalStorageKeys/StashedAuth'))
    ) {
      throw noFetchingAnotherTokenError()
    }
    return dispatch({
      type: ASSUME_SESSION,
      promise: Api.assumeSession(userId)
    })
  }
}

export const resumeSession = () => {
  return {
    type: RESUME_SESSION
  }
}

/**
 * Public: Reducer
 */

export default function reducer(state = new SessionState(), action = {}) {
  if (!(state instanceof SessionState)) 
    return toInitialState(immutableize(state))

  const { type, payload } = action

  switch (type) {
  case LOGIN_USER: {
    return handle(state, action, {
      start: prevState =>
        prevState.merge({
          phase: LOADING,
          token: null
        }),
      failure: prevState =>
        prevState.merge({
          phase: ERROR,
          token: null
        }),
      success: prevState => {
        window.localStorage.setItem(
          Config.get('/LocalStorageKeys/Authorization'),
          payload
        )
        return prevState.merge({
          phase: SUCCESS,
          token: payload
        })
      }
    })
  }

  case ASSUME_SESSION: {
    return handle(state, action, {
      start: prevState =>
        prevState.merge({
          phase: LOADING
        }),
      failure: prevState =>
        prevState.merge({
          phase: ERROR,
          token: null
        }),
      success: prevState => {
        window.localStorage.setItem(
          Config.get('/LocalStorageKeys/StashedAuth'),
          state.token
        )
        window.localStorage.setItem(
          Config.get('/LocalStorageKeys/Authorization'),
          payload.token
        )
        return prevState.merge({
          phase: SUCCESS,
          token: payload.token,
          stashedToken: state.token
        })
      }
    })
  }

  case RESUME_SESSION: {
    window.localStorage.removeItem(
      Config.get('/LocalStorageKeys/StashedAuth')
    )
    window.localStorage.setItem(
      Config.get('/LocalStorageKeys/Authorization'),
      state.stashedToken
    )
    return state.merge({
      phase: SUCCESS,
      token: state.stashedToken,
      stashedToken: null
    })
  }

  case LOGOUT_USER: {
    window.localStorage.removeItem(
      Config.get('/LocalStorageKeys/Authorization')
    )
    window.localStorage.removeItem(
      Config.get('/LocalStorageKeys/StashedAuth')
    )
    return new SessionState()
  }
  
  case SET_TOKEN: {
    localStorage.setItem(
      Config.get('/LocalStorageKeys/Authorization'),
      payload
    )
    return new SessionState()
  }

  default: {
    return state
  }
  }
}

// export const selectToken = state => state.getIn(['session', 'token'])
export const selectToken = state => state.get('session').token
export const selectStashedToken = state =>
  state.getIn(['session', 'stashedToken'])

