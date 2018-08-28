import { connect } from 'react-redux'

import PriceListComponent from './component'

import { getInventory, filterItems, toggleListView } from '../../store/priceList/duck'

const PriceListContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  { getInventory, filterItems, toggleListView }
)(PriceListComponent)

export default PriceListContainer
