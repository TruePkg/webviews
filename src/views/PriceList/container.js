import { connect } from 'react-redux'

import PriceListComponent from './component'

import { getInventory } from '../../store/priceList/duck'

const PriceListContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  { getInventory }
)(PriceListComponent)

export default PriceListContainer
