import React from 'react'
import { shallow } from 'enzyme'

import Quotes from '../component'

describe('Quotes View Component', () => {
  it('renders without crashing', () => {
    shallow(<Quotes />)
  })
})
