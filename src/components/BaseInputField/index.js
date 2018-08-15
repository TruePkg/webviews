import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import StyledInputField, {
  StyledInputFieldLabel,
  StyledInputFieldInputContainer,
  StyledInputFieldMessageContainer,
  StyledInputFieldMessage,
  StyledInputFieldAdornment
} from './style'

export const BaseInputFieldProps = {
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  expandLabel: PropTypes.bool,
  adornmentText: PropTypes.string,
  holdMessageSpace: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    active: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  }),
  inputRef: PropTypes.func
}

export default class BaseInputField extends PureComponent {
  static propTypes = {
    ...BaseInputFieldProps,
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    hasValue: PropTypes.bool.isRequired
  }

  static defaultProps = {
    holdMessageSpace: false,
    expandLabel: false,
    width: 256,
    mb: 1
  }

  render() {
    const {
      name,
      label,
      holdMessageSpace,
      adornmentText,
      helpText,
      input,
      meta,
      expandLabel,
      inputRef,
      hasValue,
      children,
      ...styleProps
    } = this.props

    const styleLogicProps = { hasValue, meta, hasAdornment: !!adornmentText }

    return (
      <StyledInputField innerRef={inputRef} {...styleProps}>
        <StyledInputFieldLabel
          htmlFor={name}
          expandLabel={expandLabel}
          {...styleLogicProps}
        >
          {label}
        </StyledInputFieldLabel>
        <StyledInputFieldInputContainer {...styleLogicProps}>
          {adornmentText && (
            <StyledInputFieldAdornment>
              {adornmentText}
            </StyledInputFieldAdornment>
          )}
          {children}
        </StyledInputFieldInputContainer>
        <StyledInputFieldMessageContainer
          holdMessageSpace={!helpText || holdMessageSpace}
        >
          {meta.touched &&
            ((meta.error && (
              <StyledInputFieldMessage error>
                {meta.error}
              </StyledInputFieldMessage>
            )) ||
              (meta.warning && (
                <StyledInputFieldMessage warning>
                  {meta.warning}
                </StyledInputFieldMessage>
              )))}
          {helpText && (
            <StyledInputFieldMessage>{helpText}</StyledInputFieldMessage>
          )}
        </StyledInputFieldMessageContainer>
      </StyledInputField>
    )
  }
}
