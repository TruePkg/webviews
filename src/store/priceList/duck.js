import { Record, List } from 'immutable'
import { handle } from 'redux-pack'

import { INIT, LOADING, SUCCESS, ERROR } from '../../utils/phases'
import { immutableize } from '../../utils/immutable'

import * as Api from './api'

/**
 * Public: Action Types
 */

export const FETCH_EXAMPLE = 'true-package/priceList/FETCH_EXAMPLE'
export const TOGGLE_PRICELIST = 'true-package/priceList/TOGGLE_PRICELIST'
export const TOGGLE_QUOTES= 'true-package/priceList/TOGGLE_QUOTES'
export const TOGGLE_CATALOG = 'true-package/priceList/TOGGLE_CATALOG'
export const TOGGLE_LISTVIEW = 'true-package/priceList/TOGGLE_LISTVIEW'
export const TOGGLE_CATEGORY = 'true-package/priceList/TOGGLE_CATEGORY'
export const FILTER_ITEMS = 'true-package/priceList/FILTER_ITEMS'

/**
 * Private: Initial State
 */

class PriceListState extends Record({
  phase: INIT,
  exampleThings: List(),
  error: null,
  priceList: true,
  quotes: false,
  catalog: false,
  listView: true,
  category: false,
  filteredItems: []
}) {}

const toInitialState = state =>
  new PriceListState(state).merge({
    exampleThings: List(state.get('exampleThings')),
    priceList: state.get('priceList'),
    quotes: state.get('quotes'),
    catalog: state.get('catalog'),
    listView: state.get('listView'),
    category: state.get('category'),
    filteredItems: List(state.get('filteredItems'))
  })

/**
 * Public: Action Creators
 */

export const fetchExample = () => ({
  type: FETCH_EXAMPLE,
  promise: Api.fetchExample()
})

export const togglePriceList = bool => ({
  type: TOGGLE_PRICELIST,
  payload: bool
})

export const toggleQuotes = bool => ({
  type: TOGGLE_QUOTES,
  payload: bool
})

export const toggleCatalog = bool => ({
  type: TOGGLE_CATALOG,
  payload: bool
})

export const toggleListView = bool => ({
  type: TOGGLE_LISTVIEW,
  payload: bool
})

export const toggleCategory = bool => ({
  type: TOGGLE_CATEGORY,
  payload: bool
})

export const filterItems = array => ({
  type: FILTER_ITEMS,
  payload: array
})

/**
 * Public: Reducer
 */

export default function reducer(state = new PriceListState(), action = {}) {
  if (!(state instanceof PriceListState)) return toInitialState(immutableize(state))

  const { type, payload } = action
/* eslint-disable */
  switch (type) {
    case FETCH_EXAMPLE: {
      return handle(state, action, {
        start: prevState => prevState.merge({ phase: LOADING, error: null }),
        failure: prevState =>
          prevState.merge({ phase: ERROR, error: payload.error }),
        success: prevState => {
          return prevState.merge({
            phase: SUCCESS,
            exampleThings: action.payload.things,
            error: null
          })
        }
      })
    }

    case TOGGLE_PRICELIST: {
      return state.merge({
        priceList: true,
        catalog: false,
        quotes: false
      })
    }

    case TOGGLE_CATALOG: {
      return state.merge({
        priceList: false,
        catalog: true,
        quotes: false
      })
    }

    case TOGGLE_QUOTES: {
      return state.merge({
        priceList: false,
        catalog: false,
        quotes: true
      })
    }

    case TOGGLE_LISTVIEW: {
      return state.merge({
        listView: true,
        category: false
      })
    }

    case TOGGLE_CATEGORY: {
      return state.merge({
        listView: false,
        category: true
      })
    }

    case FILTER_ITEMS: {
      return state.merge({
        filteredItems: payload
      })
    }

    default: {
      return state
    }
  }
}
