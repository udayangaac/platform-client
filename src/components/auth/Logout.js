import React, {Component} from 'react';
import AuthService from "../../service/auth";

class Logout extends Component {
    componentDidMount() {
        AuthService.clearLocalStorage();
        this.props.history.push("/");
    }
    render() {
        return null;
    }
}

export default Logout;
