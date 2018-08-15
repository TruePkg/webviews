import React from 'react'
import { shallow } from 'enzyme'

import Login from '../component'

describe('Login View Component', () => {
  it('renders without crashing', () => {
    shallow(<Login />)
  })
})
