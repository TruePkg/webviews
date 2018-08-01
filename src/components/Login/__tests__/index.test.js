import React from 'react'
import { shallow } from 'enzyme'

import Login from '../'

describe('Login', () => {
  it('renders without crashing', () => {
    shallow(
      <Login>Login</Login>
    )
  })
})
