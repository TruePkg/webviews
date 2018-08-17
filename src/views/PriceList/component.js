import React, { PureComponent } from 'react'
import styled from 'styled-components'
import CustomInput from '../../components/CustomInput/CustomInput'
import InputAdornment from "@material-ui/core/InputAdornment";
import FontAwesome from 'react-fontawesome'
import Search from '@material-ui/icons/Search'
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Button from '../../components/CustomButtons/Button.jsx'
import Paper from '@material-ui/core/Paper'
import { Grid, Col, Row } from 'react-flexbox-grid'
import FlexView from 'react-flexview'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import SearchBar from './search'
import Category from './category'
import List from './list'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";

import PropTypes from 'prop-types'

const StyledPriceList = styled.div`// Styles go here`

export class PriceListComponent extends PureComponent {
  static propTypes = {
    // PropTypes go here
    listView: PropTypes.bool,
    category: PropTypes.bool
  }

  render() {
    if (this.props.quotes) {
      return <Redirect to='/quotes' />
    }
    if (this.props.catalog) {
      return <Redirect to='/catalog' />
    }
    console.log(this.props, 'props fma')
    return (
      <Grid fluid>
        <SearchBar />
        {
          this.props.category ?
          <Category /> :
          <List filteredItems={this.props.filteredItems}/> 
        }
      </Grid>
    )
  }
}

const mapState = state => {
  const listView = state.get('priceList').listView
  const category = state.get('priceList').category
  const quotes = state.get('priceList').quotes
  const catalog = state.get('priceList').catalog
  const filteredItems = state.get('priceList').filteredItems
  return {
    listView,
    category,
    quotes,
    catalog,
    filteredItems
  }
}

const mapDispatch = dispatch => ({

})

export default connect(mapState, mapDispatch)(PriceListComponent)