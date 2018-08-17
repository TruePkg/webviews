import React from 'react'
import FlexView from 'react-flexview'
import Button from '../../components/CustomButtons/Button.jsx'

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
      <Button color="info" onClick={props.togglePriceList}>
        Price list
      </Button>
      <Button color="info" onClick={props.toggleQuotes}>
        Quotes
      </Button>
      <Button color="info" onClick={props.toggleCatalog}>
        Catalog
      </Button>
    </FlexView>
  )
}

export default Footer