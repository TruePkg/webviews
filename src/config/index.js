import Confidence from '../utils/confidence'

const criteria = {
  appEnv: process.env.REACT_APP_ENV,
  nodeEnv: process.env.NODE_ENV
}

const API_OVERRIDE_KEY = 'API_HOSTNAME'
const BRAINTREE_OVERRIDE_KEY = 'BRAINTREE_MODE'

const fetchBraintreeKey = () => {
  const localBraintreeOverride = window.localStorage.getItem(
    BRAINTREE_OVERRIDE_KEY
  )
  switch (localBraintreeOverride
    ? localBraintreeOverride.toUpperCase()
    : 'default') {
  case 'LIVE': {
    // eslint-disable-next-line no-console
    console.warn('Braintree key was overrriden to use LIVE key')
    return 'cqfs78rf9rcrc6wk'
  }
  default: {
    return 'cqfs78rf9rcrc6wk'
  }
  }
}

const config = {
  ApiHostname: {
    $filter: 'appEnv',
    production: 'https://api.docknow.com',
    test: `${process.env.REACT_APP_API_HOSTNAME ||
      'https://testymctest.docknow.com'}`,
    $default: `${window.localStorage.getItem(API_OVERRIDE_KEY) ||
      process.env.REACT_APP_API_HOSTNAME ||
      'https://staging.docknow.com'}`
  },
  LocalStorageKeys: {
    Authorization: 'Authorization',
    StashedAuth: 'StashedAuthorization',
    ApiOverride: API_OVERRIDE_KEY,
    BraintreeOverride: BRAINTREE_OVERRIDE_KEY
  },
  Braintree: {
    $filter: 'appEnv',
    production: 'cqfs78rf9rcrc6wk',
    staging: 'cqfs78rf9rcrc6wk',
    $default: fetchBraintreeKey()
  },
  Google: {
    apiKey: 'AIzaSyBZFXb3cqk5-RZBA--J8ACSX5CRJ8LtpOI'
  },
  GoogleAnalytics: {
    trackingId: {
      $filter: 'appEnv',
      production: 'UA-100014537-1',
      $default: 'UA-100014537-X'
    }
  }
}

const store = new Confidence.Store(config)

export default {
  get: key => store.get(key, criteria)
}
