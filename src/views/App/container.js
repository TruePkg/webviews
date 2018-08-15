import { connect } from 'react-redux'

import {
  logoutUser,
  resumeSession,
  selectToken,
  selectStashedToken
} from '../../store/session/duck'

import AppComponent from './component'

const AppContainer = connect(
  state => ({
    token: selectToken(state),
    stashedToken: selectStashedToken(state),
  }),
  { logoutUser, resumeSession  }
)(AppComponent)

export default AppContainer
