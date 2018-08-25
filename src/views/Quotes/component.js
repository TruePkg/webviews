import React, { PureComponent } from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'
import Options from './options'
import Button from '../../components/CustomButtons/Button'
import FlexView from 'react-flexview'
import { connect } from 'react-redux'
import { toggleNewQuote, toggleDrafts } from '../../store/quotes/duck'
import PropTypes from 'prop-types'
import NewQuote from './newQuote'
import Drafts from './draft'
import { Redirect } from "react-router-dom";

const StyledQuotes = styled.div`// Styles go here`

export class QuotesComponent extends PureComponent {
  static propTypes = {
    // PropTypes go here
    newQuote: PropTypes.bool,
    drafts: PropTypes.bool
  }

  render() {
    const { newQuote, drafts, priceList, catalog } = this.props
    // if (priceList) {
    //   return <Redirect to='/pricelist'/>
    // }
    // if (catalog) {
    //   return <Redirect to='/catalog'/>
    // }

    if (!newQuote && !drafts) {
      return <Options toggleNewQuote={this.props.toggleNewQuote} toggleDrafts={this.props.toggleDrafts}/>
    }
    
    if (newQuote) {
      return <NewQuote />
    }
    if (drafts) {
      return <Drafts />
    }
  }
}

const mapState = state => {
  const newQuote = state.get('quotes').newQuote
  const drafts = state.get('quotes').drafts
  const priceList = state.get('priceList').priceList
  const catalog = state.get('priceList').catalog
  return {
    newQuote,
    drafts,
    priceList,
    catalog
  }
}

const mapDispatch = dispatch => ({
  toggleDrafts: bool => (dispatch(toggleDrafts(bool))),
  toggleNewQuote: bool => (dispatch(toggleNewQuote(bool)))
})

export default connect(mapState, mapDispatch)(QuotesComponent)
