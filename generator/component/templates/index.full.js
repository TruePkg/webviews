import React, { Component } from 'react'
// import PropTypes from 'prop-types'
<% if (hasStyles) { %>
import Styled<%= componentName %> from './style'
<% } %>
export default class <%= componentName %> extends Component {
  static propTypes = {
    // PropTypes go here
  }

  static defaultProps = {
    // Default Props go here
  }

  render() {
<% if (hasStyles) { -%>
    return <Styled<%= componentName %>><%= componentName %></Styled<%= componentName %>>
<% } else { -%>
    return <<%= rootElement %>><%= componentName %></<%= rootElement %>>
<% } -%>
  }
}
