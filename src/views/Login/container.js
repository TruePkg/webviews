import { connect } from 'react-redux'

import { loginUser, selectToken } from '../../store/session/duck'

import LoginComponent from './component'

const LoginContainer = connect(
  // Map state to props
  state => ({
    token: selectToken(state)
  }),
  // Map actions to dispatch and props
  // { loginUser }
  { loginUser }
)(LoginComponent)

export default LoginContainer

