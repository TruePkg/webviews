import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import Decorator from '<%= pathToStorybook %>/decorator'

import <%= componentName %> from '.'

storiesOf('<%= componentPath %><%= componentName %>', module)
  .addDecorator(Decorator)
  .add('naked story', () => <<%= componentName %> />)
