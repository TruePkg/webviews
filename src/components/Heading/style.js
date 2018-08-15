import React from 'react'
import { css } from 'styled-components'
import omit from 'lodash/omit'
import { space, fontSize, color } from 'styled-system'

import StyledTextBase from '../Base/style'

export default StyledTextBase.withComponent(props =>
  React.createElement(`h${props.size}`, omitProps(props))
).extend`
  ${space};
  ${fontSize};
  ${color};
  ${props => {
    if (props.thin) {
      return css`
        font-weight: ${props.theme.fontSizeThin};
      `
    }
    if (props.regular) {
      return css`
        font-weight: ${props.theme.fontSizeRegular};
      `
    }
    return null
  }}
`

const omitProps = props =>
  omit(props, ['textAlign', 'm', 'thin', 'regular', 'grey', 'p'])
