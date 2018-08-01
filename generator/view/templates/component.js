import React, { PureComponent } from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'

const Styled<%= viewName %> = styled.div`// Styles go here`

export default class <%= viewName %>Component extends PureComponent {
  static propTypes = {
    // PropTypes go here
  }

  render() {
    return (
      <Styled<%= viewName %>>
        <h1><%= viewName %></h1>
      </Styled<%= viewName %>>
    )
  }
}
