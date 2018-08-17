import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import Button from '../../components/CustomButtons/Button'
import FlexView from 'react-flexview'


const Options = props => {
  return (
    <FlexView height='100%' width='100%' hAlignContent='center' vAlignContent='center' column>
      <Button
        color='info'
        size='lg'
        onClick={props.toggleNewQuote}
      >
        Quote
      </Button>
      <Button
        color='info'
        size='lg'
        onClick={props.toggleDrafts}
      >
        Drafts
      </Button>
    </FlexView>
  )
}

export default Options
