import Immutable, { Iterable, fromJS } from 'immutable'
import installDevTools from 'immutable-devtools'

export const immutableize = state =>
  Iterable.isIterable(state) ? state : fromJS(state)

export const startImmutableDevTools = () =>
  process.env.NODE_ENV === 'development' && installDevTools(Immutable)
