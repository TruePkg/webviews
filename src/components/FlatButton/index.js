import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ProgressCircle from '../ProgressCircle'

import StyledFlatButton from './style'

const propTypes = {
  // This component implements styled-system
  // See props available at: https://github.com/jxnblk/styled-system
  textAlign: PropTypes.oneOf(['left', 'right', 'center']),
  onClick: PropTypes.func,
  overBg: PropTypes.string,
  overColor: PropTypes.string,
  overStyles: PropTypes.object,
  theme: PropTypes.shape({
    lightMedGrey: PropTypes.string
  }),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  primary: PropTypes.bool,
  primaryInvert: PropTypes.bool,
  danger: PropTypes.bool,
  success: PropTypes.bool,
  cancel: PropTypes.bool,
  circle: PropTypes.bool,
  href: PropTypes.string,
  // for use if react-router Link
  to: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  submitting: PropTypes.bool,
  active: PropTypes.bool,
  // Used to get access to the ref of whatever the trigger component would be
  triggerRef: PropTypes.func
}

const defaultProps = {
  textAlign: 'center',
  height: 'auto',
  p: 2,
  fontSize: 2,
  bg: 'transparent',
  primary: false,
  danger: false,
  success: false,
  cancel: false,
  circle: false,
  fullWidth: false,
  disabled: false,
  active: false,
  overStyles: {}
}

const FlatButton = props => {
  const { children, onClick, href, to, submitting, ...styledProps } = props

  let htmlAtt
  if (href) {
    htmlAtt = 'a'
  } else if (to) {
    htmlAtt = Link
  } else {
    htmlAtt = 'button'
  }

  return (
    <StyledFlatButton
      component={htmlAtt}
      onClick={onClick}
      href={href}
      to={to}
      {...styledProps}
    >
      {submitting ? <ProgressCircle /> : children}
    </StyledFlatButton>
  )
}

FlatButton.propTypes = propTypes
FlatButton.defaultProps = defaultProps

export default FlatButton