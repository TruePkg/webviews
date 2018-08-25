import Confidence from '../utils/confidence'

const criteria = {
  appEnv: process.env.REACT_APP_ENV,
  nodeEnv: process.env.NODE_ENV
}

const API_OVERRIDE_KEY = 'API_HOSTNAME'
const BRAINTREE_OVERRIDE_KEY = 'BRAINTREE_MODE'

const config = {
  ApiHostname: {
    $filter: 'appEnv',
    production: '',
    test: `${process.env.REACT_APP_API_HOSTNAME ||
      'https://w5hmwgacu0.execute-api.us-east-1.amazonaws.com/production'}`,
    $default: `${window.localStorage.getItem(API_OVERRIDE_KEY) ||
      process.env.REACT_APP_API_HOSTNAME ||
      'https://w5hmwgacu0.execute-api.us-east-1.amazonaws.com/production'}`
  },
  LocalStorageKeys: {
    Authorization: 'Authorization',
    StashedAuth: 'StashedAuthorization',
    ApiOverride: API_OVERRIDE_KEY,
  }
}

const store = new Confidence.Store(config)

export default {
  get: key => store.get(key, criteria)
}
