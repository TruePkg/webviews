import React from 'react'
// import PropTypes from 'prop-types'
<% if (hasStyles) { %>
import Styled<%= componentName %> from './style'
<% } %>
const propTypes = {
  // PropTypes go here
}

const defaultProps = {
  // Default Props go here
}

const <%= componentName %> = (/* { // Destructure props here } */) => {
<% if (hasStyles) { -%>
  return <Styled<%= componentName %>><%= componentName %></Styled<%= componentName %>>
<% } else { -%>
  return <<%= rootElement %>><%= componentName %></<%= rootElement %>>
<% } -%>
}

<%= componentName %>.propTypes = propTypes
<%= componentName %>.defaultProps = defaultProps

export default <%= componentName %>
