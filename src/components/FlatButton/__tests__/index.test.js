import React from 'react'
import { shallow } from 'enzyme'

import FlatButton from '../'

describe('FlatButton', () => {
  it('renders without crashing', () => {
    shallow(
      <FlatButton>FlatButton</FlatButton>
    )
  })
})
