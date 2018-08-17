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
// import { toJS } from 'immutable'

// import PropTypes from 'prop-types'

const StyledPriceList = styled.div`// Styles go here`

export default class PriceListComponent extends PureComponent {
  static propTypes = {
    // PropTypes go here
  }

  render() {
    //   console.log(this.props.filteredItems.toJS(), 'propsssssss')
    return (
        <Paper>
          <Table>
            <TableBody>
              {
                this.props.filteredItems.map(item => {
                    console.log(item.get('description'), 'asfasfsdf')
                  return (
                    <TableRow>
                    <TableCell>
                      {item.get('name')}
                    </TableCell>
                    <TableCell>
                      {item.get('sku')}
                    </TableCell>
                    <TableCell>
                      {item.get('descriptions')}
                    </TableCell>
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
