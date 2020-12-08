import React, {Component} from "react";
import {AppBar, Avatar, IconButton, Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import AuthService from "../../service/auth";


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    handleMenu(event) {
    }

    onLoginBtnClick() {
    }

    onLogoutBtnClick() {
    }

    renderAppBarUser() {

        let profile = AuthService.getLocalStorageProfile();
        console.log(profile);

        if (profile != undefined) {
            return (
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                    </IconButton>
                    <Typography variant="h6">
                        {profile.user_name}
                    </Typography>
                    <div>
                        <Avatar alt="Profile Picture" src={profile.profile_image}/>
                        <Button color="inherit" href="/logout">Logout</Button>
                    </div>
                </Toolbar>
            )
        }
        return (
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                </IconButton>
                <Typography variant="h6">
                    News
                </Typography>
                <Button color="inherit" href="/login">Login</Button>
            </Toolbar>
        )
    }

    render() {
        return (
            <section>
                <AppBar position="static">
                    {this.renderAppBarUser()}
                </AppBar>
            </section>
        )
    }
}

export default Header;
