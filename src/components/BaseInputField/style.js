import styled, { css } from 'styled-components'
import { width, space } from 'styled-system'

export const StyledInputFieldLabel = styled.label`
  position: absolute;
  font-size: 18px;
  transform-origin: top left;
  transition: transform 0.3s, color 0.3s;
  transform: translate(
      ${({ hasAdornment }) => (hasAdornment ? '14px' : '0')},
      23px
    )
    scale(1);
  color: ${({ theme }) => theme.lightMedGrey};

  ${({ meta: { active }, hasValue }) =>
    (active || hasValue) &&
    css`
      color: ${({ theme, hasValue, meta: { touched, error, warning } }) => {
        if (touched && error) return theme.errorColor
        if (touched && warning) return theme.warningColor
        return theme.brandColor
      }};
    `};

  ${({ meta: { active }, hasValue, expandLabel }) =>
    (expandLabel || active || hasValue) &&
    css`
      transform: translate(0, 1.5px) scale(0.75);
    `};
`

export const StyledInputFieldInputContainer = styled.div`
  margin-top: 16px;
  position: relative;
  display: flex;
  align-content: center;

  &:before,
  &:after {
    content: '';
    position: absolute;
    height: 2px;
    left: 0;
    right: 0;
    bottom: 0;
    transition: transform 0.3s;
  }

  &:before {
    background-color: ${({
      theme,
      hasValue,
      meta: { touched, error, warning }
    }) => {
      if (touched && error) return theme.errorColor
      if (touched && warning) return theme.warningColor
      return theme.lightMedGrey
    }};
  }

  &:after {
    background-color: ${({
      theme,
      hasValue,
      meta: { touched, error, warning }
    }) => {
      if (touched && error) return theme.errorColor
      if (touched && warning) return theme.warningColor
      return theme.brandColor
    }};
    transform: scaleX(${({ meta: { active } }) => (active ? 1 : 0)});
  }
`

export const StyledInputFieldAdornment = styled.div`
  padding: 8px 4px 8px 0;
`

export const StyledInputFieldInput = styled.input`
  font-size: 18px;
  padding: 8px 0;
  border: 0;
  background-color: transparent;
  width: 100%;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.lightMedGrey};
    transition: opacity 0.3s;
    opacity: ${({ meta: { active }, hasValue, expandLabel }) =>
      expandLabel || (active && !hasValue) ? 1 : 0};
  }
`

export const StyledInputFieldMessageContainer = styled.div`
  ${({ holdMessageSpace }) =>
    holdMessageSpace &&
    css`
      min-height: 22px;
    `};
`

export const StyledInputFieldMessage = styled.div`
  font-size: 12px;
  margin: 4px 0;
  color: ${({ theme, error, warning }) => {
    if (error) return theme.errorColor
    if (warning) return theme.warningColor
    return theme.medGrey
  }};
`

export default styled.div`
  ${width};
  ${space};
  display: flex;
  flex-direction: column;
  position: relative;
`
