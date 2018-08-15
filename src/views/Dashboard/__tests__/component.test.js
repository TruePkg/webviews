import React from 'react'
import { shallow } from 'enzyme'

import Dashboard from '../component'

describe('Dashboard View Component', () => {
  it('renders without crashing', () => {
    shallow(<Dashboard />)
  })
})
