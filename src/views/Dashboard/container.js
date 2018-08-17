import { connect } from 'react-redux'
import { logoutUser } from '../../store/session/duck'
import DashboardComponent from './component'
import { toggleQuotes, toggleCatalog, togglePriceList } from '../../store/priceList/duck'


const DashboardContainer = connect(
  // Map state to props
  
  (state) => ({
    priceList: state.get('priceList').priceList,
    catalog: state.get('priceList').catalog,
    quotes: state.get('priceList').catalog
  }),
  // Map actions to dispatch and props
  { logoutUser }
)(DashboardComponent)

export default DashboardContainer
