import React, { PureComponent } from 'react'
import styled from 'styled-components'
import withStyles from "@material-ui/core/styles/withStyles";
import Email from "@material-ui/icons/Email";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.jsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "../../components/CustomButtons/Button.jsx";
// import CustomTabs from '../../components/CustomTabs/CustomTabs.jsx'

// import PropTypes from 'prop-types'
import Header from "../../components/Header/Header.jsx";
import navbarsStyle from "../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle.jsx";


// const StyledDashboard = styled.div`// Styles go here`

class Navbar extends React.Component {
  // static propTypes = {
  //   // PropTypes go here
  // }

  componentDidMount() {
    // this.props.logoutUser()
  }

  render() {
    const { classes } = this.props
    return (
      <Header
        brand="True Package"
        color="info"
        rightLinks={

          <List className={classes.list}>
            <ListItem className={classes.listItem}>
              <Button
                href="#pablo"
                className={classes.navLink}
                onClick={e => e.preventDefault()}
                color="transparent"
              >
                Price List
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button
                href="#pablo"
                className={classes.navLink}
                onClick={e => e.preventDefault()}
                color="transparent"
              >
                Quotes
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button
                href="#pablo"
                className={classes.navLink}
                onClick={e => e.preventDefault()}
                color="transparent"
              >
                Catalog
              </Button>
            </ListItem>
            {/* <ListItem className={classes.listItem}>
              <Button
                justIcon
                round
                href="#pablo"
                className={classes.notificationNavLink}
                onClick={e => e.preventDefault()}
                color="rose"
              >
                <Email className={classes.icons} />
              </Button>
            </ListItem> */}
            <ListItem className={classes.listItem}>
              <CustomDropdown
                left
                caret={false}
                hoverColor="black"
                dropdownHeader="True Package Options"
                buttonText={
                  <img
                    src='https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350'
                    className={classes.img}
                    alt="profile"
                  />
                }
                buttonProps={{
                  className:
                    classes.navLink + " " + classes.imageDropdownButton,
                  color: "transparent"
                }}
                dropdownList={[
                  "Me",
                  "Settings and other stuff",
                  "Sign out"
                ]}
              />
            </ListItem>
          </List>
        }
      />
    )
  }
}

export default withStyles(navbarsStyle)(Navbar)