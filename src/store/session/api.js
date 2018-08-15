import fetch from '../../utils/fetch'

export const loginUser = async credentials => {
  const res = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  const payload = await res.json()
  return { token: payload.body }
}

export const assumeSession = async userId => {
  const res = await fetch(`/session/token/assume/${userId}`)
  const payload = await res.json()
  return payload.data[0]
}
