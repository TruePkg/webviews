import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export default class PrivateRoute extends React.Component {
  render() {
    const { token, path, component } = this.props
    console.log(token, 'token in private router')
    if (token) {
      return <Route exact path={path} component={component}/>
    } else {
      return <Redirect to={{ pathname: '/login'}} />
    }
  }
}