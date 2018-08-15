import React from 'react'
import { shallow } from 'enzyme'

import ShadowBox from '../'

describe('ShadowBox', () => {
  it('renders without crashing', () => {
    shallow(
      <ShadowBox>ShadowBox</ShadowBox>
    )
  })
})
