import { connect } from 'react-redux'

import CatalogComponent from './component'

const CatalogContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {}
)(CatalogComponent)

export default CatalogContainer
