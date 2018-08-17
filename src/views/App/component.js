import React, { PureComponent } from "react";
import styled, { injectGlobal } from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
import { space, zIndex } from "styled-system";
import PropTypes from "prop-types";
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
    console.log(this.props.priceList, this.props.quotes, this.props.catalog, 'asdffasdfsfasfd');
    const {
      togglePriceList,
      toggleQuotes,
      toggleCatalog,
      priceList,
      quotes,
      catalog
    } = this.props
    return (
      <StyledApp>
        <Navbar />
        <Footer 
          togglePriceList={togglePriceList}
          toggleQuotes={toggleQuotes}
          toggleCatalog={toggleCatalog}
        />
        <StyledAppContainer>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/pricelist" component={PriceList} />
            <Route exact path="/quotes" component={Quotes} />
            <Route exact path="/catalog" component={Catalog} />
            <Route render={() => <Redirect to="/login" />} />
          </Switch>
        </StyledAppContainer>
      </StyledApp>
    );
  }
}
