/* eslint-disable react/prop-types */

import React from 'react'
import styled from 'styled-components'
import { responsiveStyle } from 'styled-system'

export const display = responsiveStyle({ prop: 'd', cssProperty: 'display' })

export const overflow = responsiveStyle({
  prop: 'overflow',
  cssProperty: 'overflow'
})

export const height = responsiveStyle({ prop: 'h', cssProperty: 'height' })

export const maxHeight = responsiveStyle({
  prop: 'maxH',
  cssProperty: 'maxHeight'
})

export const maxWidth = responsiveStyle({
  prop: 'maxW',
  cssProperty: 'maxWidth'
})

export const minHeight = responsiveStyle({
  prop: 'minH',
  cssProperty: 'minHeight'
})

export const minWidth = responsiveStyle({
  prop: 'minW',
  cssProperty: 'minWidth'
})

export const omitStyled = (WrappedComponent, omitProps = []) => {
  const Wrapper = ({ children, ...props }) => {
    omitProps.forEach(propName => {
      delete props[propName]
    })
    return <WrappedComponent {...props}>{children}</WrappedComponent>
  }
  return styled(Wrapper)
}