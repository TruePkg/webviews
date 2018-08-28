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
import TableHead from '@material-ui/core/TableHead'
import SearchBar from './search'
import Category from './category'
import { ColumnNames } from './columnNames'
import Hidden from '@material-ui/core/Hidden'
// import { toJS } from 'immutable'

// import PropTypes from 'prop-types'

const StyledPriceList = styled.div`// Styles go here`

export default class PriceListComponent extends PureComponent {
  static propTypes = {
    // PropTypes go here
  }

  render() {
    const { filteredItems, inventory } = this.props
    console.log(filteredItems, 'the filteered items in list.js!')
    let itemsToDisplay = filteredItems.size > 0 ? filteredItems : inventory
    //   console.log(this.props.filteredItems.toJS(), 'propsssssss')
    return (
        <Paper>
          <Table>
            <TableHead>{ColumnNames}</TableHead>
            <TableBody>
              {
                itemsToDisplay.map((item, i) => {
                    console.log(item, 'filtered item in map list.js')
                  return (
                    <TableRow key={i}>
                    <TableCell>
                      {item.get('Name')}
                    </TableCell>
                    <TableCell>
                      {item.get('SKU')}
                    </TableCell>
                    <Hidden xsDown>
                      <TableCell>
                        {item.get('Description')}
                      </TableCell>
                    </Hidden>
                    <Hidden xsDown>
                      <TableCell>
                        {item.get('Price')}
                      </TableCell>
                    </Hidden>
                    <Hidden xsDown>
                      <TableCell>
                        {item.get('Category')}
                      </TableCell>
                    </Hidden>                     
                    <TableCell>
                      <FlexView hAlignContent='right'>
                        <FontAwesome name='fas fa-plus-circle' size='2x' style={{ color: 'grey' }}/>
                      </FlexView>
                    </TableCell>
                  </TableRow>
                  )
                })
              }
              {/* <TableRow>
                <TableCell>
                  list item 1
                </TableCell>
                <TableCell>
                  <FlexView hAlignContent='right'>
                    <FontAwesome name='fas fa-plus-circle' size='2x' style={{ color: 'grey' }}/>
                  </FlexView>
                </TableCell>
              </TableRow> */}

            </TableBody>
          </Table>
        </Paper>
    )
  }
}
