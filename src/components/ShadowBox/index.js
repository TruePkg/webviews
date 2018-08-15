import React from 'react'
import PropTypes from 'prop-types'

import StyledShadowBox from './style'

const propTypes = {
  // eslint-disable-next-line no-magic-numbers
  level: PropTypes.oneOf([0, 1, 2, 3]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  // use this for elements that need responsive/full width behavior. RideCard is one such element.
  fullWidth: PropTypes.bool
}

const defaultProps = {
  level: 2,
  fullWidth: false,
  p: 0
}

const ShadowBox = props => {
  const { children, ...styledProps } = props
  return <StyledShadowBox {...styledProps}>{children}</StyledShadowBox>
}

ShadowBox.propTypes = propTypes
ShadowBox.defaultProps = defaultProps

export default ShadowBox
