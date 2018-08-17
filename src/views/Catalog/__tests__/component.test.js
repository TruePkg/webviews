import React from 'react'
import { shallow } from 'enzyme'

import Catalog from '../component'

describe('Catalog View Component', () => {
  it('renders without crashing', () => {
    shallow(<Catalog />)
  })
})
