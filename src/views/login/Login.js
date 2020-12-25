import React, {Component} from "react";
import FacebookLogin from 'react-facebook-login';
import AuthService from "../../services/auth";
import axios from "axios";
import MenuAppBar from "../../components/header/MenuAppBar";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import withStyles from "@material-ui/core/styles/withStyles";


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';

import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

    FBButton: {
        background: 'linear-gradient(45deg, #627aac 30%, #627aac 90%)',
        border: 0,
        borderRadius: 2,
        boxShadow: '0 1px 1px 1px rgba(0, 0, 0, .3)',
        color: 'white',
        minHeight: 30,
        padding: '0 30px',
        width:"100%",
        fontSize:15,
    }
});


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



class Login extends Component {

    constructor(props) {
        super(props);
    }

    responseFacebook = (response) => {
        axios.get("http://localhost:8085/oauth2/v1/fb/authenticate?access_token=" + response.accessToken).then(res => {
            console.log("Data from main API", res.data);
            AuthService.setLocalStorage(res.data);
            this.props.history.push("/dashboard");
        }).catch(err => {
            console.log("Facebook login failed", err)
        });
    };

    componentClicked = (response) => {
    };


    render() {
        const {classes} = this.props;
        return (
            <section>
                <MenuAppBar/>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Get into the platform
                        </Typography>
                        <form className={classes.form} noValidate>
                            <FacebookLogin
                                appId="1315776515444028"
                                autoLoad={true}
                                fields="name,email,picture"
                                size="medium"
                                cssClass={classes.FBButton}
                                tag={Button}
                                textButton="Continue With Facebook"
                                onClick={this.componentClicked}
                                callback={this.responseFacebook}/>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        You dont have facebook account ?
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={8}>
                        <Copyright/>
                    </Box>
                </Container>
            </section>


        );
    }
}

export default withStyles(styles, {withTheme: true})(Login);
