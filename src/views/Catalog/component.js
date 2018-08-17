import React, { PureComponent } from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'

const StyledCatalog = styled.div`// Styles go here`

export default class CatalogComponent extends PureComponent {
  static propTypes = {
    // PropTypes go here
  }

  render() {
    return (
      <StyledCatalog>
        <h1>Catalog</h1>
      </StyledCatalog>
    )
  }
}
