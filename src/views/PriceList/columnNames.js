import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'
import Hidden from '@material-ui/core/Hidden'
import FlexView from 'react-flexview'
import FontAwesome from 'react-fontawesome'

export const ColumnNames = (
  <TableRow>
    <TableCell>Name</TableCell>
    <TableCell>SKU</TableCell>
    <Hidden xsDown>
      <TableCell>
        Description
      </TableCell>
    </Hidden>
    <Hidden xsDown>  
      <TableCell>
        Price
      </TableCell>
    </Hidden>
    <Hidden xsDown>  
      <TableCell>
        Category
      </TableCell>
    </Hidden>
    <TableCell>
      <FlexView hAlignContent='right'>
        <FontAwesome name='fas fa-plus-circle' size='2x' style={{ color: 'grey' }}/>
      </FlexView>
    </TableCell>
  </TableRow>
)
