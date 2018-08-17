import { connect } from 'react-redux'

import QuotesComponent from './component'

const QuotesContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {}
)(QuotesComponent)

export default QuotesContainer
