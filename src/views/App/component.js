import React, { PureComponent } from "react";
import styled, { injectGlobal } from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
import { space, zIndex } from "styled-system";
import PropTypes from "prop-types";
import PrivateRoute from '../Navbar/router'
import asyncComponent from "../../utils/asyncComponent";
import withStyles from "@material-ui/core/styles/withStyles";
import Navbar from "../Navbar/component";
import NavPills from "../../components/NavPills/NavPills.jsx";
import PriceList from "../PriceList/container";
import Quotes from "../Quotes/container";
import Catalog from "../Catalog/container";
import FlexView from "react-flexview";
import Button from "../../components/CustomButtons/Button.jsx";
import Footer from './footer'
import { toggleCatalog } from "../../store/priceList/duck";

// import Login from '../../components/Login'

const Login = asyncComponent(
  /* istanbul ignore next */ () => import("../../views/Login/container")
);

const Dashboard = asyncComponent(() =>
  import("../../views/Dashboard/container")
);

injectGlobal`
  body {
    background-position: center bottom;
    background-attachment: fixed;
    background-size: contain;
    background-repeat: no-repeat;

    /*iPhone 8 Plus and lower */
    @media only screen
    and (max-device-width : 736px) {
      background-image: none;
    }
  }
`;

const StyledApp = styled.div`
  // Styles go here
  // background-color: #000;
`;
const StyledAppContainer = styled.div`
  position: relative;
  max-width: ${props => props.theme.viewportMaxWidth};
  margin: 0 auto;
  ${space};
  // background-color: #000;
`;

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
    resumeSession: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      topPadding: 1
    };
  }

  handleHeaderResize = topPadding => {
    this.setState(() => ({ topPadding }));
  };

  handleRemoveNotification = notification =>
    this.props.removeNotification(notification.uid);

  render() {
    const {
      togglePriceList,
      toggleQuotes,
      toggleCatalog,
      priceList,
      quotes,
      catalog,
      token,
      showQuoteOptions
    } = this.props
    return (
      <StyledApp>
        { this.props.token ? 
        <div>
          <Navbar logoutUser={this.props.logoutUser}/>
          <Footer 
            // togglePriceList={togglePriceList}
            // toggleQuotes={toggleQuotes}
            // toggleCatalog={toggleCatalog}
            showQuoteOptions={showQuoteOptions}
          />
        </div>
        :
        null
      }
        <StyledAppContainer>
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute token={token} path="/dashboard" component={Dashboard} />
            <PrivateRoute token={token} path="/pricelist" component={PriceList} />
            <PrivateRoute token={token} path="/quotes" component={Quotes} />
            <PrivateRoute token={token} path="/catalog" component={Catalog} />
            <PrivateRoute render={() => <Redirect to="/login" />} />
          </Switch>
        </StyledAppContainer>
      </StyledApp>
    );
  }
}
