import { connect } from 'react-redux'

import CatalogComponent from './component'

const CatalogContainer = connect(
  // Map state to props
  (state) => ({
    priceList: state.get('priceList').priceList,
    quotes: state.get('priceList').quotes
  }),
  // Map actions to dispatch and props

  {}
)(CatalogComponent)

export default CatalogContainer
