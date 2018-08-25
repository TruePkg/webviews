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
// import PropTypes from 'prop-types'
import Header from "../../components/Header/Header.jsx";
import navbarsStyle from "../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle.jsx";
import axios from 'axios'

// const StyledDashboard = styled.div`// Styles go here`

class Navbar extends React.Component {
  // static propTypes = {
  //   // PropTypes go here
  // }
  constructor() {
    super()
  }

  componentDidMount() {
    // this.props.logoutUser()
  }

  onDrop = async files => {
    const file = files[0]
    const url = await axios.post(`${process.env.REACT_APP_API_HOSTNAME}/users/signature`, {
      fileName: file.name,
      fileType: file.type
    })
    console.log(url, 'eyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
    const { data } = url
    axios
    .put(data.signedRequest, file, { headers: { 'Content-type': file.type } })
    .then(res => {
      console.log(`https://truepackageinventory.s3.amazonaws.com/${file.name}`, 'blahblah')
      return `https://truepackageinventory.s3.amazonaws.com/${file.name}`
    })
    .catch(err => {
      return err
    })
    const postToDB = await axios.post(`${process.env.REACT_APP_API_HOSTNAME}/csv`, {
      csvUrl: `https://truepackageinventory.s3.amazonaws.com/${file.name}`
    })
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