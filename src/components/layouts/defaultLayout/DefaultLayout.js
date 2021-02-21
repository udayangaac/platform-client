import React, {Component, Suspense} from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AuthService from "../../../services/auth";
import Auth from "../../auth/Auth";
import Logout from "../../auth/Logout"
import EditAdvertisement from "../../../views/advertisement/edit/EditAdvertisement";
import AddAdvertisement from "../../../views/advertisement/add/AddAdvertisement";
import ConfigureAdvertisement from "../../../views/advertisement/configure/ConfigureAdvertisement";
import Dashboard from "../../../views/dashboard";

const LoginView = React.lazy(() => import('../../../views/login/Login'));
const HomeView = React.lazy(() => import('../../../views/home/Home'));



class DefaultLayout extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let auth = AuthService.getLocalStorageProfile();
        console.log(auth);
        this.setState({
            auth: auth
        })
    }



    loading() {
        return (<h1>Loading</h1>)
    }

    render() {
        return (
            <section>
                <BrowserRouter>
                    <Suspense fallback={this.loading()}>
                        <Switch>
                            <Route path="/" exact component={HomeView}/>
                            <Route path="/login" exact component={LoginView}/>
                            <Route path="/logout" exact component={Logout}/>
                            <Auth>
                                <Route path="/dashboard" exact component={Dashboard}/>
                                <Route path="/dashboard/advertisement/edit/:id" exact component={EditAdvertisement}/>
                                <Route path="/dashboard/advertisement/add" exact component={AddAdvertisement}/>
                                <Route path="/dashboard/advertisement/configure" exact
                                       component={ConfigureAdvertisement}/>
                            </Auth>
                        </Switch>
                    </Suspense>
                </BrowserRouter>
            </section>
        );
    }
}

export default DefaultLayout
