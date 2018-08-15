import styled, { css } from 'styled-components'
import { color, fontSize, fontWeight, space } from 'styled-system'

export default styled.p`
  ${color};
  ${fontSize};
  ${fontWeight};
  ${space};
  text-align: ${props => props.textAlign};
  ${props =>
    props.thin
      ? css`
          font-weight: ${props.theme.fontSizeThin};
        `
      : null};
`
