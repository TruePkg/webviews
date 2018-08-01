import React, { PureComponent } from 'react'
import styled, { injectGlobal } from 'styled-components'
import { Switch, Route, Redirect } from 'react-router-dom'
import { space } from 'styled-system'
import PropTypes from 'prop-types'

import Login from '../../components/Login'

injectGlobal`
  @font-face {
    font-family: 'Noto Sans';
    src: url('https://fonts.googleapis.com/css?family=Noto+Sans');
  }

  body {
    font-family: 'Noto Sans';
    background-position: center bottom;
    background-attachment: fixed;
    background-size: contain;
    background-repeat: no-repeat;
    // background-color: #FFF;

    /*iPhone 8 Plus and lower */
    @media only screen
    and (max-device-width : 736px) {
      background-image: none;
    }
  }
`

const StyledApp = styled.div`
  // Styles go here
  // background-color: #000;
`
const StyledAppContainer = styled.div`
  position: relative;
  max-width: ${props => props.theme.viewportMaxWidth};
  margin: 0 auto;
  ${space};
  // background-color: #000;
`

export default class AppComponent extends PureComponent {
  static propTypes = {
    token: PropTypes.string,
    stashedToken: PropTypes.string,
    location: PropTypes.object,
    logoutUser: PropTypes.func,
    hasApiOverride: PropTypes.bool,
    apiOverride: PropTypes.string,
    stripeOverride: PropTypes.string,
    removeNotification: PropTypes.func,
    resumeSession: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      topPadding: 1
    }
  }

  handleHeaderResize = topPadding => {
    this.setState(() => ({ topPadding }))
  }

  handleRemoveNotification = notification =>
    this.props.removeNotification(notification.uid)

  render() {
    return (
      <StyledApp>
        <StyledAppContainer>
          <Switch>
            <Route exact path="/login" component={Login} />            
            <Route render={() => <Redirect to="/login" />} />
          </Switch>
        </StyledAppContainer>
      </StyledApp>
    )
  }
}
