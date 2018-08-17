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
import { connect } from 'react-redux'
import { toggleCategory, toggleListView } from '../../store/priceList/duck'

import PropTypes from 'prop-types'

const StyledPriceList = styled.div`// Styles go here`

export class SearchBar extends PureComponent {
  static propTypes = {
    // PropTypes go here
    listView: PropTypes.bool,
    category: PropTypes.bool,
    toggleCategory: PropTypes.func,
    toggleListView: PropTypes.func
  }

  render() {
    return (
        <Row>
            <FlexView width='100%' hAlignContent='center' row='true'>
            <FlexView vAlignContent='center' hAlignContent='left'>
                <Col xs={3}>
                <CustomInput
                    color='info'
                    id='material'
                    inputProps={{
                    placeholder: 'Search catalog'
                    }}
                    formControlProps={{
                    }}
                />
                </Col>
            </FlexView>
            <FlexView vAlignContent='center' hAlignContent='left'>
                <Col xs={9}>
                <FlexView row='true'>
                    <Button color="info" size='sm' onClick={this.props.toggleCategory}>
                    Cat
                    </Button>
                    <Button color="info" size='sm' onClick={this.props.toggleListView}>
                    List
                    </Button>
                
                </FlexView>
                </Col>
            </FlexView>
            </FlexView>
        </Row>  
    )
  }
}

const mapState = state => {
  const category = state.get('priceList').category
  const listView = state.get('priceList').listView
  return {
    category,
    listView
  }
}

const mapDispatch = dispatch => ({
  toggleCategory: bool => dispatch(toggleCategory(bool)),
  toggleListView: bool => dispatch(toggleListView(bool))
})

export default connect(mapState, mapDispatch)(SearchBar)