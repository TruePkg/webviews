import React from 'react'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import FlexView from 'react-flexview'
import FontAwesome from 'react-fontawesome'


export class NewQuote extends React.Component {
  render() {
    return (
      <FlexView width='100%' hAlignContent='center' >
        <Paper>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                    list item 1
                </TableCell>
                <TableCell>
                  <FlexView hAlignContent='right'>
                    <FontAwesome name='fas fa-plus-circle' size='2x' style={{ color: 'grey' }}/>
                  </FlexView>
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </Paper>
      </FlexView>
    )
  }
}

export default NewQuote