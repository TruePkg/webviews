import React, { PureComponent } from 'react'
import styled from 'styled-components'
import withStyles from "@material-ui/core/styles/withStyles";
import Email from "@material-ui/icons/Email";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.jsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "../../components/CustomButtons/Button.jsx";
// import CustomTabs from '../../components/CustomTabs/CustomTabs.jsx'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import Header from "../../components/Header/Header.jsx";
import navbarsStyle from "../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle.jsx";
import axios from 'axios'

// const StyledDashboard = styled.div`// Styles go here`

class Navbar extends React.Component {
  static propTypes = {
    // PropTypes go here
    updatePriceList: PropTypes.func,
    token: PropTypes.string
  }
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // this.props.logoutUser()
  }

  onDrop = async files => {
    console.log(this.props.token)
    await this.props.updatePriceList(files, this.props.token)
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
                href=''
                className={classes.navLink}
                onClick={()=> {}}
                color="transparent"
              >
                <label>
                  Update Inventory
                  <Dropzone 
                    style={{display: 'none'}}
                    onDrop={this.onDrop}  
                  />                
                </label>
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button
                href="#pablo"
                className={classes.navLink}
                onClick={this.props.logoutUser}
                color="transparent"
              >
                Logout
              </Button>
            </ListItem>
          </List>
        }
      />
    )
  }
}

export default withStyles(navbarsStyle)(Navbar)