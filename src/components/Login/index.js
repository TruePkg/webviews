import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import StyledLogin from './style'

export class Login extends Component {
  static propTypes = {
    // PropTypes go here
  }

  static defaultProps = {
    // Default Props go here
  }

  render() {
    return <StyledLogin>Login</StyledLogin>
  }
}

const mapState = state => {
  return {
    
  }
}

const mapDispatch = () => ({

})

export default connect(mapState, mapDispatch)(Login)
