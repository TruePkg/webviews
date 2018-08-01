import fetch from 'isomorphic-fetch'

// import Rollbar from 'utils/rollbar'

import Config from '../config'

const handleHTTPErrors = res => {
  if (res.ok) return res
  return res.json().then(err => {
    /* istanbul ignore next */
    if (['production', 'staging'].includes(process.env.REACT_APP_ENV)) {
      if (err.statusCode) {
        // Rollbar.error(`HTTP Error (${err.statusCode}): ${err.error}`, err)
        return `HTTP Error (${err.statusCode}): ${err.error}`
      } else {
        // Rollbar.error('Fetch Error', err)
        return err
      }
    }
    throw err
  })
}

export default (url, options) => {
  const jwtToken = localStorage.getItem(
    Config.get('/LocalStorageKeys/Authorization')
  )

  // If the passed URL is not prefixed with http/https, assume
  // we are hitting the dock API and prefix hostname
  if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
    url = `${Config.get('/ApiHostname')}${url}`
  }

  if (jwtToken) {
    let authAddedOptions = options
    if (typeof options !== 'object') {
      authAddedOptions = {}
    }
    if (typeof authAddedOptions.headers !== 'object') {
      authAddedOptions.headers = {}
    }
    authAddedOptions.headers = {
      ...authAddedOptions.headers,
      Authorization: jwtToken
    }
    return fetch(url, authAddedOptions).then(handleHTTPErrors)
  } else {
    return fetch(url, options).then(handleHTTPErrors)
  }
}