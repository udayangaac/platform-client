import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import AuthService from "../../services/auth";
import MenuItem from "@material-ui/core/MenuItem";
import logo from '../../img/logo.png'
import DeleteIcon from '@material-ui/icons/Delete';
import Link from "@material-ui/core/Link";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontFamily: " 'Montserrat', sans-serif",
    },
    logo: {
        maxHeight: 80,
    }
}));

export default function MenuAppBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const profile = AuthService.getLocalStorageProfile();
    let AppBarItems = (<span/>);
    if (profile !== null) {
        const handleOpenDropdown = Boolean(anchorEl);

        const handleDropdown = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleCloseDropdown = () => {
            setAnchorEl(null);
        };

        AppBarItems = (
            <Toolbar>
                {/*<IconButton*/}
                {/*    href="/"*/}
                {/*    edge="start"*/}
                {/*    className={classes.menuButton}*/}
                {/*    color="inherit"*/}
                {/*    aria-label="menu">*/}
                {/*    <MenuIcon/>*/}
                {/*</IconButton>*/}
                <img src={logo} alt="Kitty Katty!" className={classes.logo}/>
                <Typography
                    variant="h6"
                    className={classes.title}>
                </Typography>
                <section>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleDropdown}
                            color="inherit"
                        >
                            <Avatar src={profile.profile_image}/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={handleOpenDropdown}
                            onClose={handleCloseDropdown}
                        >
                            <MenuItem
                                href="/dashboard"
                            >
                                Dashboard
                                {/*<Button variant="text" size="small">dashboard</Button>*/}
                            </MenuItem>
                            <MenuItem onClick={(event) => {this.props.history.push("/logout")}}>
                                <Button
                                    variant="text"
                                    size="small"
                                    startIcon={<DeleteIcon/>}
                                    href="/logout">Logout</Button>
                            </MenuItem>
                        </Menu>
                    </div>
                </section>
            </Toolbar>
        )
    } else {
        AppBarItems = (
            <Toolbar>
                {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
                {/*    <MenuIcon/>*/}
                {/*</IconButton>*/}
                <img src={logo} alt="Kitty Katty!" className={classes.logo}/>
                <Typography variant="h6" className={classes.title}>
                </Typography>
                <section>
                    <div>
                        <Button size="small" color="inherit" href="/login">Login</Button>
                    </div>
                </section>
            </Toolbar>
        )
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                {AppBarItems}
            </AppBar>
        </div>
    );
}
