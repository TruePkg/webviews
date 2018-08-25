import React from 'react'
import FlexView from 'react-flexview'
import Button from '../../components/CustomButtons/Button.jsx'
import { Link } from 'react-router-dom'

const Footer = props => {
  return (
    <FlexView
      width="100%"
      hAlignContent="center"
      style={{
        position: 'fixed',
        bottom: 0,
        marginBottom: '10px',
        zIndex: '999999'
      }}
    >
      {/* <Button color="info" onClick={props.togglePriceList}>
        Price list
      </Button>
      <Button color="info" onClick={props.toggleQuotes}>
        Quotes
      </Button>
      <Button color="info" onClick={props.toggleCatalog}>
        Catalog
      </Button> */}
      <Link to="/pricelist" style={{ textDecoration: 'none' }}>
        <Button color="info">
          Price list
        </Button>
      </Link>
      <Link to="/quotes" style={{ textDecoration: 'none' }} onClick={props.showQuoteOptions}>
        <Button color="info">
          Quotes
        </Button>
      </Link>
      <Link to="/catalog" style={{ textDecoration: 'none' }}>
        <Button color="info">
          Catalog
        </Button>
      </Link>
    </FlexView>
  )
}

export default Footer