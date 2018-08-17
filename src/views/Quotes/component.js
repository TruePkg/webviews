import React, { PureComponent } from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'

const StyledQuotes = styled.div`// Styles go here`

export default class QuotesComponent extends PureComponent {
  static propTypes = {
    // PropTypes go here
  }

  render() {
    return (
      <StyledQuotes>
        <h1>Quotes</h1>
      </StyledQuotes>
    )
  }
}
