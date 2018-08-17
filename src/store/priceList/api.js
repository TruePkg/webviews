import { List } from 'immutable'

import fetch from '../../utils/fetch'

export const fetchExample = () => {
  return fetch('/example')
    .then(res => res.json())
    .then(payload => new List(payload))
}
