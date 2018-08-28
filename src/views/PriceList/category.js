import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import _ from 'lodash'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
})

class Category extends PureComponent {
  filterByCategory = selectedCategory => {
    console.log(selectedCategory)
    const { inventory } = this.props
    const filteredList = inventory.filter(item => {
      const category = item.get('Category')
      return selectedCategory === category 
    })
    this.props.filterItems(filteredList)
    this.props.toggleListView()
  }

  render() {
    const { inventory } = this.props
    let categories = inventory.toJS()
    categories = _.map(_.uniqBy(categories, item => {
      return item.Category
    }), item => {
      return {
        title: item.Category,
        img: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350'
      }
    })

    console.log(categories, 'categories in category.js')
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          {categories.map((tile, i) => (
            <GridListTile key={tile.title}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                onClick={this.filterByCategory.bind(this, tile.title)}
                title={tile.title}
                id={tile.title}
                actionIcon={
                  <IconButton>
                    <InfoIcon></InfoIcon>
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  }
}

export default withStyles(styles)(Category)