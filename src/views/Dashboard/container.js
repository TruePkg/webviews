import { connect } from 'react-redux'
import { logoutUser } from '../../store/session/duck'
import DashboardComponent from './component'

const DashboardContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  { logoutUser }
)(DashboardComponent)

export default DashboardContainer
