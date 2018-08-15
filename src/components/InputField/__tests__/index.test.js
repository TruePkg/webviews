import React from 'react'
import { shallow } from 'enzyme'

import InputField from '../'

describe('InputField', () => {
  it('renders without crashing', () => {
    shallow(
      <InputField>InputField</InputField>
    )
  })
})
