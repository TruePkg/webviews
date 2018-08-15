import React from 'react'
import { shallow } from 'enzyme'

import ProgressCircle from '../'

describe('ProgressCircle', () => {
  it('renders without crashing', () => {
    shallow(
      <ProgressCircle>ProgressCircle</ProgressCircle>
    )
  })
})
