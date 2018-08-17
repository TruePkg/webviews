import { connect } from 'react-redux'

import PriceListComponent from './component'

const PriceListContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {}
)(PriceListComponent)

export default PriceListContainer
