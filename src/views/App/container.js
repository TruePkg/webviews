import { connect } from 'react-redux'

import {
  logoutUser,
  resumeSession,
  selectToken,
  selectStashedToken
} from '../../store/session/duck'
import { toggleQuotes, toggleCatalog, togglePriceList } from '../../store/priceList/duck'


import AppComponent from './component'

const AppContainer = connect(
  state => ({
    token: selectToken(state),
    stashedToken: selectStashedToken(state),
    priceList: state.get('priceList').priceList,
    catalog: state.get('priceList').catalog,
    quotes: state.get('priceList').catalog
  }),
  { logoutUser, resumeSession, toggleQuotes, toggleCatalog, togglePriceList  }
)(AppComponent)

export default AppContainer

