import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form/immutable'
import { Map } from 'immutable'
import { middleware as reduxPackMiddleware } from 'redux-pack'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { immutableize } from '../utils/immutable'
import { debounceMiddleware } from '../utils/redux'

import app from './app/duck'
import session, { LOGOUT_USER } from './session/duck'

const middleware = [
  thunk,
  reduxPackMiddleware,
  debounceMiddleware
]

middleware.push(createLogger({}))

const appReducers = combineReducers({
  app,
  session,
  form: formReducer
})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    state = undefined
  }
  return appReducers(state, action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default (initialState = new Map()) => {
  const store = createStore(
    rootReducer,
    immutableize(initialState),
    composeEnhancers(applyMiddleware(...middleware))
  )
  return store
}