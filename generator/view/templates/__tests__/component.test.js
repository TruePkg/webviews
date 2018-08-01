import React from 'react'
import { shallow } from 'enzyme'

import <%= viewName %> from '../component'

describe('<%= viewName %> View Component', () => {
  it('renders without crashing', () => {
    shallow(<<%= viewName %> />)
  })
})
