import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import AuthService from "../../services/auth";
import Login from "../../views/login";

class Auth extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        let profile = AuthService.getLocalStorageProfile();
        if (profile=== null || profile=== undefined){
            return (<Login/>)
        }
        return (
            <section>{this.props.children}</section>
        )
    }
}

export default withRouter(Auth);
