import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import AuthService from "../../service/auth";

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        let profile = AuthService.getLocalStorageProfile();
        console.log("Get profile from local storage", profile);
        this.setState({
            user:profile,
        })
    }

    render() {
        return (
            <section>{this.props.children}</section>
        )
    }
}

export default withRouter(Auth);
