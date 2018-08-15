import styled from 'styled-components'
import { space, color, width } from 'styled-system'

const shadowLevels = [['0px', 0], ['4px', 0.1], ['8px', 0.1], ['16px', 0.1]]

export default styled.div`
  ${space};
  ${color};
  ${width};
  box-sizing: border-box;
  display: ${props => (props.fullWidth ? 'block' : 'inline-block')};
  box-shadow: 0px 0px ${props => shadowLevels[props.level][0]}
    rgba(0, 0, 0, ${props => shadowLevels[props.level][1]});
`
