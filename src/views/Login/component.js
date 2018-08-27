/* eslint no-magic-numbers: 0 */
import React, { PureComponent } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Flex } from "grid-styled";
import { space } from "styled-system";
import { Helmet } from "react-helmet";
import { SubmissionError } from "redux-form/immutable";
import FlexView from "react-flexview";

import ShadowBox from "../../components/ShadowBox";
import Heading from "../../components/Heading";
import BodyCopy from "../../components/BodyCopy";
// import FlatButton from 'components/FlatButton'
import theme from "../../theme";

import LoginForm from "./partials/LoginForm";

const StyledLogin = styled.div`
  ${space};
`;

export default class LoginComponent extends PureComponent {
  static propTypes = {
    token: PropTypes.string,
    // loginUser: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  // componentDidMount() {
  //   const { token } = this.props
  // }

  handleSubmit = async data => {
    console.log(
      data.get("email"),
      data.get("organization"),
      data.get("role"),
      data.get("password"),
      "yup"
    );
    const { error: loginError, payload } = await this.props.loginUser({
      email: data.get("email").toLowerCase(),
      password: data.get("password"),
      organization: data.get("organization").toLowerCase(),
      role: data.get("role").toLowerCase()
    });

    if (loginError) {
      throw new SubmissionError({ _error: payload.message });
    }
    // window.location.reload()
  };

  render() {
    const { token } = this.props;
    console.log(token, 'sadfdsafsadfsf')
    if (token) {
      console.log('we made it in here boysss')
      return <Redirect to="/dashboard" />;
    }

    return (
      // <StyledLogin pt={[2, 4]}>
      //   {/* <Helmet>
      //     <title>Login</title>
      //   </Helmet> */}
      // </StyledLogin>
        <FlexView width='100%' hAlignContent="center" vAlignContent="center">
          <ShadowBox level={3} bg="white" p={3} /*width={[9 / 10, 1/ 2]}*/ >
            <Heading fontSize={4}>Login</Heading>
            {/* <BodyCopy pb={2}>Sign in to your TruePackage account</BodyCopy> */}
            <LoginForm onSubmit={this.handleSubmit} />
            Forgot password?
          </ShadowBox>
          {/* <Flex justify="center"> */}
            {/* <ShadowBox level={1} bg="white" p={3} width={[9 / 10, 1 / 2]}>
              <BodyCopy pb={2}>Sign in to see your Dock account</BodyCopy>
              <LoginForm onSubmit={this.handleSubmit} />
              <FlatButton
                overBg="none"
                overColor={theme.primaryButtonOverBg}
                to="/password-recovery"
                width={1}
                color={theme.brandColor}
              >
                Forgot password?
              </FlatButton>
            </ShadowBox> */}
          {/* </Flex> */}
        </FlexView>
    );
  }
}
