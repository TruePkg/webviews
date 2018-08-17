import React from 'react'
import FlexView from 'react-flexview'
import Button from '../../components/CustomButtons/Button.jsx'

export default class Footer extends React.Component {
    
  render() {
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
        <Button color="info" onClick={this.priceList}>
          Price list
        </Button>
        <Button color="info">
          Quotes
        </Button>
        <Button color="info">
          Catalog
        </Button>
      </FlexView>
    )
  }
}