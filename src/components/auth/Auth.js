import React, {Component} from 'react';
import Home from "../";
import {withRouter} from 'react-router-dom'
import AuthService from "../../service/auth";

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        }
    }

    componentDidMount() {
        this.setState({
            user: AuthService.getLocalStorageProfile(),
        })
    }

    render() {
        if (this.state.user === undefined) {
            this.props.history.push('/login')
        }
        return (
            <section>{this.props.children}</section>
        )
    }
}

export default withRouter(Auth);
