import React, {Component} from "react";
import FacebookLogin from 'react-facebook-login';
import setProfile from "../../service/login";
import AuthService from "../../service/auth";
import axios from "axios";

class Login extends Component {

    constructor(props) {
        super(props);
    }

    responseFacebook = (response) => {
        axios.get("http://localhost:8085/oauth2/v1/fb/authenticate?access_token=" + response.accessToken).then(res => {
            console.log(res.data);
            AuthService.setLocalStorage(res.data);
            this.props.history.push("/");
        }).catch(err => {

        });
    };

    componentClicked = (response) => {
    };

    render() {
        return (
            <section>
                <FacebookLogin
                    appId="1315776515444028"
                    autoLoad={true}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}/>
            </section>
        );
    }
}


export default Login;
