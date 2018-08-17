import React, { PureComponent } from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

const StyledCatalog = styled.div`// Styles go here`

export default class CatalogComponent extends PureComponent {
  static propTypes = {
    // PropTypes go here
  }

  render() {
    if (this.props.quotes) {
      return <Redirect to='/quotes' />
    }
    if (this.props.priceList) {
      return <Redirect to='/pricelist' />
    }
    return (
      <StyledCatalog>
        <h1>Catalog</h1>
      </StyledCatalog>
    )
  }
}
