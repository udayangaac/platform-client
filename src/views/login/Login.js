import React, {Component} from "react";
import FacebookLogin from 'react-facebook-login';
import AuthService from "../../services/auth";
import axios from "axios";
import MenuAppBar from "../../components/header/MenuAppBar";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


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
        return (
            <section>
                <MenuAppBar/>
                <Container maxWidth="sm">
                    <Grid container spacing={10}>
                        <Grid container item xs={12} sm={6} spacing={1}>
                            <FacebookLogin
                                appId="1315776515444028"
                                autoLoad={true}
                                fields="name,email,picture"
                                onClick={this.componentClicked}
                                callback={this.responseFacebook}/>
                        </Grid>
                        <Grid container item xs={12} sm={6} spacing={1}>
                        </Grid>
                    </Grid>
                </Container>
            </section>
        );
    }
}


export default Login;
