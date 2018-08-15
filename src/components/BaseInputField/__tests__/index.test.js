import React from 'react'
import { shallow } from 'enzyme'

import BaseInputField from '../'

describe('BaseInputField', () => {
  it('renders without crashing', () => {
    shallow(
      <BaseInputField>BaseInputField</BaseInputField>
    )
  })
})
