import React, {Component} from "react";
import FacebookLogin from 'react-facebook-login';
import setProfile from "../../service/login";
import AuthService from "../../service/auth";

class Login extends Component {

    responseFacebook = (response) => {
        setProfile(response.accessToken);
        this.props.history.push('/');
    };
    componentClicked = (response) => {
        console.log(response);
    };

    componentDidMount() {
        if (AuthService.getLocalStorageProfile() != undefined ){
            this.props.history.push('/');
        }
    }

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
