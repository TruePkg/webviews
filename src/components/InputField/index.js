import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isNumber from 'lodash/isNumber'

import BaseInputField, { BaseInputFieldProps } from '../BaseInputField'

import { StyledInputFieldInput } from '../BaseInputField/style'

export default class InputField extends PureComponent {
  static propTypes = {
    ...BaseInputFieldProps,
    input: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string
  }

  render() {
    const {
      input,
      placeholder,
      type,
      label,
      maxLength,
      meta,
      minLength,
      min,
      max,
      autoComplete,
      expandLabel,
      ...passthroughProps
    } = this.props

    const hasValue = !!(
      input.value &&
      (isNumber(input.value) || input.value.length > 0)
    )

    return (
      <BaseInputField
        name={input.name}
        label={label}
        meta={meta}
        hasValue={hasValue}
        expandLabel={expandLabel}
        {...passthroughProps}
      >
        <StyledInputFieldInput
          placeholder={placeholder}
          type={type}
          maxLength={maxLength}
          minLength={minLength}
          min={min}
          max={max}
          autoComplete={autoComplete}
          expandLabel={expandLabel}
          hasValue={hasValue}
          meta={meta}
          {...input}
        />
      </BaseInputField>
    )
  }
}
