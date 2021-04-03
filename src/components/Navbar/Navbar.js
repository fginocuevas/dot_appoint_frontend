import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const Navbar = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    return(
        <AppBar position="static">
            <Toolbar>
            <IconButton 
                edge="start" 
                className={classes.menuButton} 
                color="inherit" 
                aria-label="menu"
                aria-controls="simple-menu" 
                aria-haspopup="true" 
                onClick={handleClick}>
                <MenuIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                    <MenuItem onClick={handleClose} component={NavLink} to="/events">Schedule Event</MenuItem>
                    <MenuItem onClick={handleClose} component={NavLink} to="/account"> Account</MenuItem>
                    <MenuItem onClick={handleClose} component={NavLink} to="/logout">Logout</MenuItem>
            </Menu>
            <Typography variant="h5" className={classes.title}>
                .appoint
            </Typography>
            </Toolbar>
        </AppBar>
    ) 
}

export default Navbar;