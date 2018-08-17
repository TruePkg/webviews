import React from 'react'
import { shallow } from 'enzyme'

import PriceList from '../component'

describe('PriceList View Component', () => {
  it('renders without crashing', () => {
    shallow(<PriceList />)
  })
})
