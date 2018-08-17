import React from 'react'
import CustomTabs from '../../components/CustomTabs/CustomTabs.jsx'
// import NavPills from '../../components/NavPills/NavPills.jsx'
// import PropTypes from 'prop-types'
import PriceList from '../PriceList/container'
import Quotes from '../Quotes/container'
import Catalog from '../Catalog/container'
import FlexView from 'react-flexview'
import { Redirect } from "react-router-dom";

export default class DashboardComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      priceList,
      catalog,
      quotes
    } = this.props
    if (priceList) {
      return <Redirect to='/pricelist' />
    }
    if (catalog) {
      return <Redirect to='/catalog' />
    }
    if (quotes) {
      return <Redirect to='/quotes' />
    }
  }
}