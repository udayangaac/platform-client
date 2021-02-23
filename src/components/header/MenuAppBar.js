import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import AuthService from "../../services/auth";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from '@material-ui/icons/Delete';

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
                <IconButton
                    style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                    }}
                    href="/"
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography
                    style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                    }}
                    variant="h6"
                    className={classes.title}>
                    {profile.user_name}
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
                            style={{
                                fontFamily: "'Nunito Sans', sans-serif",
                            }}
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
                            <MenuItem>
                                <Button
                                    style={{
                                        fontFamily: "'Nunito Sans', sans-serif",
                                    }}
                                    size="small"
                                    href="/dashboard">dashboard</Button>
                            </MenuItem>
                            <MenuItem>
                                <Button
                                    style={{
                                        fontFamily: "'Nunito Sans', sans-serif",
                                    }}
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
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
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
